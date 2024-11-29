from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
CORS(app)  


nlp = spacy.load("en_core_web_sm")


questions = [
    "what is your name?",
    "how can I contact support?",
    "what payment methods do you accept?",
    "where are you located?",
    "how can I reset my password?",
    "how does your product work?"
]

responses = [
    "I am a chatbot created to answer FAQs.",
    "You can contact support via email at support@example.com.",
    "We accept credit cards, PayPal, and bank transfers.",
    "Our main office is in San Francisco, USA.",
    "You can reset your password by clicking 'Forgot Password' on the login page.",
    "Our product helps you automate tasks efficiently."
]


vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(questions)
model = LogisticRegression()
model.fit(X, responses)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()

    if not data or 'query' not in data:
        return jsonify({"error": "Invalid input"}), 400

    user_query = data['query']
    user_vector = vectorizer.transform([user_query])

    response = model.predict(user_vector)[0]

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
