import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import vision
from google.oauth2 import service_account
import io
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set up Vision Client with explicit credentials
credentials_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
if not credentials_path:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set")

if not os.path.exists(credentials_path):
    raise FileNotFoundError(f"Credentials file not found at {credentials_path}")

try:
    credentials = service_account.Credentials.from_service_account_file(credentials_path)
    client = vision.ImageAnnotatorClient(credentials=credentials)
    logging.info("Google Vision client initialized successfully")
except Exception as e:
    logging.error(f"Error initializing Google Vision client: {str(e)}")
    raise

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']

    try:
        # Read image data for Google Vision API
        image_content = image_file.read()
        image = vision.Image(content=image_content)

        # Perform label detection using Vision API
        response = client.label_detection(image=image)
        labels = response.label_annotations

        # Collect the most relevant label descriptions
        label_descriptions = [label.description for label in labels]

        # Perform color detection using Vision API
        response_properties = client.image_properties(image=image)
        colors = response_properties.image_properties_annotation.dominant_colors.colors

        # Collect the most dominant colors (RGB)
        color_descriptions = [f"rgb({int(color.color.red)}, {int(color.color.green)}, {int(color.color.blue)})"
                              for color in colors]

        return jsonify({
            "message": "Image analyzed successfully",
            "labels": label_descriptions,
            "colors": color_descriptions
        })
    except Exception as e:
        logging.error(f"Error analyzing image: {str(e)}")
        return jsonify({"error": "An error occurred while analyzing the image"}), 500

@app.route('/')
def home():
    return "Welcome to the Fashion Recognition AI API"

if __name__ == '__main__':
    app.run(debug=True, port=5002)  # or any other available port