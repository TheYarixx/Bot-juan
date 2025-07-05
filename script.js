const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  addMessage("user", userMessage);
  respondTo(userMessage.toLowerCase());
  input.value = "";
});

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = (sender === "user" ? "Tú: " : "Bot Juan: ") + text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function respondTo(message) {
  let response = "No entendí eso, ¿puedes intentarlo de nuevo?";

  if (message.includes("hola")) {
    response = "¡Hola gamer! ¿Listo para la acción?";
  } else if (message.includes("chiste")) {
    response = "¿Por qué el programador odia el verano? Porque hay muchos bugs. 🐞";
  } else if (message.includes("curiosidad")) {
    response = "¿Sabías que el primer videojuego fue creado en 1958? ¡Era un tenis!";
  } else if (message.includes("motiva") || message.includes("frase")) {
    response = "¡No pares hasta lograrlo, devjuan! 🚀";
  } else if (message.includes("github")) {
    response = "Aquí está mi GitHub: https://github.com/devjuan";
  } else if (message.includes("web")) {
    response = "¡Estás en mi web oficial! 😎";
  }

  setTimeout(() => {
    addMessage("bot", response);
  }, 500);
}