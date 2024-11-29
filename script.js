// const responseField = document.getElementById("chatResponse");
// const newElement = document.createElement("div");
// const newElementBot = document.createElement("div");
async function askChatbot() {
    const responseField = document.getElementById("chatResponse");
    const newElement = document.createElement("div");
    const newElementBot = document.createElement("div");
    const query = document.getElementById("userQuery").value;
    
  newElement.classList.add('resMe', 'cen');
  newElement.innerHTML = `<div class="resValue">${query}</div><div class="pro cen">ME</div>`;
  responseField.appendChild(newElement);
  // Ensure the user entered something
  if (!query.trim()) {
    responseField.textContent = "Please enter a question.";
    return;
  } 

  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    if(!data.response){
        BotMessage("data.response");
    } else {
        // BotMessage(data.response);
        newElementBot.classList.add('resBot', 'cen');
        newElementBot.innerHTML = `<div class="pro cen">BO</div><div class="resValue">${data.response}</div>`;
        responseField.appendChild(newElementBot);
    }
    // responseField.textContent = data.response BotMessage(data.response) || "No response received.";
    // responseField.textContent = BotMessage(data.response) || BotMessage("No response received.");
} catch (error) {
    responseField.textContent = "Error communicating with the server.";
}
}
function BotMessage(params) {
    newElementBot.classList.add('resBot', 'cen');
    newElementBot.innerHTML = `<div class="pro cen">BO</div><div class="resValue">${params}</div>`;
    responseField.appendChild(newElementBot);
}