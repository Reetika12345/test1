const responses = {
    "hello": "Hello! How can I assist you with your dental care today?",
    "how are you": "I'm just a virtual assistant, but I'm here to help with any dental concerns you may have!",
    "need help": "What dental issue would you like assistance with today?",
    "tooth pain": "I'm sorry you're experiencing tooth pain. Do you need help finding a nearby dentist or some home remedies?",
    "checkup": "Would you like to schedule a dental checkup? I can help with that!",
    "cavity": "It sounds like you may have a cavity. Would you like tips on how to avoid them or book an appointment for treatment?",
    "braces": "Thinking about braces? I can provide information or help you book a consultation with an orthodontist!",
    "teeth whitening": "Looking to brighten your smile? I can suggest options for teeth whitening treatments.",
    "gum disease": "Gum health is crucial! Would you like to learn more about gum disease and how to treat it?",
    "emergency": "It seems like you're in a dental emergency. Should I assist you in finding an emergency dentist nearby?",
    "bye": "Goodbye! Take care of your smile and have a great day!",
    "default": "I'm sorry, I didn't quite catch that. Can I help you with a dental question or appointment?",
    "expert": "I’m connecting you with a dentist right away. Please hold on!",
    "no": "Alright, feel free to ask me anytime if you need dental advice!",
};

document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = chatbotPopup.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        respondToUser(userInput.toLowerCase());
        document.getElementById('user-input').value = '';
    }
}

function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
        appendMessage('bot', response);
    }, 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === 'bot' && message === responses["default"]) {
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            appendMessage('bot', responses["expert"]);
        };
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
            appendMessage('bot', responses["no"]);
        };
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}