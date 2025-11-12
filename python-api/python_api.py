"""
Python AI Models API
====================
Flask API to serve AI model predictions for Next.js frontend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Model directory
MODELS_DIR = Path(__file__).parent.parent / 'Nifty200_Models_Pro'


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'service': 'Python AI Models API',
        'version': '1.0.0',
        'models_available': check_models_available(),
    })


@app.route('/predict', methods=['POST'])
def predict():
    """
    Generate AI prediction for a stock.
    
    Request Body:
    {
        "symbol": "RELIANCE",
        "features": [array of 22 features]
    }
    
    Response:
    {
        "success": true,
        "symbol": "RELIANCE",
        "confidence": 85.5,
        "prediction": 1,
        "probability": [0.145, 0.855]
    }
    """
    try:
        data = request.json
        symbol = data.get('symbol')
        features = data.get('features')
        
        if not symbol or not features:
            return jsonify({
                'success': False,
                'message': 'Symbol and features are required'
            }), 400
        
        # Load model
        model_path = MODELS_DIR / f'ensemble_{symbol}.pkl'
        
        if not model_path.exists():
            return jsonify({
                'success': False,
                'message': f'Model not found for {symbol}',
                'model_path': str(model_path)
            }), 404
        
        # Load model
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        
        # Prepare features
        X = np.array(features).reshape(1, -1)
        
        # Get prediction
        prediction = int(model.predict(X)[0])
        
        # Get probability (confidence)
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba(X)[0]
            confidence = float(proba[1] * 100)  # Probability of positive class
            probability = proba.tolist()
        else:
            confidence = 75.0 if prediction == 1 else 25.0
            probability = [0.25, 0.75] if prediction == 1 else [0.75, 0.25]
        
        return jsonify({
            'success': True,
            'symbol': symbol,
            'prediction': prediction,
            'confidence': round(confidence, 2),
            'probability': probability,
        })
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@app.route('/predict/bulk', methods=['POST'])
def predict_bulk():
    """
    Generate predictions for multiple stocks.
    
    Request Body:
    {
        "stocks": [
            {"symbol": "RELIANCE", "features": [...]},
            {"symbol": "TCS", "features": [...]}
        ]
    }
    """
    try:
        data = request.json
        stocks = data.get('stocks', [])
        
        results = []
        
        for stock_data in stocks:
            symbol = stock_data.get('symbol')
            features = stock_data.get('features')
            
            # Load and predict
            model_path = MODELS_DIR / f'ensemble_{symbol}.pkl'
            
            if model_path.exists():
                with open(model_path, 'rb') as f:
                    model = pickle.load(f)
                
                X = np.array(features).reshape(1, -1)
                prediction = int(model.predict(X)[0])
                
                if hasattr(model, 'predict_proba'):
                    proba = model.predict_proba(X)[0]
                    confidence = float(proba[1] * 100)
                else:
                    confidence = 75.0 if prediction == 1 else 25.0
                
                results.append({
                    'symbol': symbol,
                    'prediction': prediction,
                    'confidence': round(confidence, 2),
                    'success': True
                })
            else:
                results.append({
                    'symbol': symbol,
                    'success': False,
                    'message': 'Model not found'
                })
        
        return jsonify({
            'success': True,
            'results': results,
            'count': len(results)
        })
        
    except Exception as e:
        logger.error(f"Bulk prediction error: {e}")
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@app.route('/models', methods=['GET'])
def list_models():
    """List all available models."""
    try:
        models = []
        
        if MODELS_DIR.exists():
            for model_file in MODELS_DIR.glob('ensemble_*.pkl'):
                symbol = model_file.stem.replace('ensemble_', '')
                models.append({
                    'symbol': symbol,
                    'file': model_file.name,
                    'size': model_file.stat().st_size,
                })
        
        return jsonify({
            'success': True,
            'models': models,
            'count': len(models)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


def check_models_available():
    """Check how many models are available."""
    if not MODELS_DIR.exists():
        return 0
    return len(list(MODELS_DIR.glob('ensemble_*.pkl')))


if __name__ == '__main__':
    logger.info("="*70)
    logger.info(" Python AI Models API Server")
    logger.info("="*70)
    logger.info(f"Models directory: {MODELS_DIR}")
    logger.info(f"Models available: {check_models_available()}")
    logger.info("Starting server on http://localhost:5000")
    logger.info("="*70)
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )

