from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_input = data.get('message', '').strip()
        
        if not user_input:
            return jsonify({"error": "Empty message received"}), 400

        logger.debug(f"Received message: {user_input}")

        try:
            response = ollama.chat(
                model="healthbot",
                messages=[{"role": "user", "content": user_input}]
            )

            ai_response = response.get("message", {}).get("content", "I'm sorry, I didn't understand that.")
            return jsonify({"message": ai_response})

        except Exception as ollama_error:
            logger.error(f"Ollama service error: {ollama_error}")
            return jsonify({"message": "AI service is unavailable. Please try again later."}), 503

    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({"message": "An error occurred."}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
