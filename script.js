const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

let userName = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  addMessage("user", userMessage);
  processInput(userMessage.toLowerCase());
  input.value = "";
});

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = (sender === "user" ? "Tú: " : "Bot Juan: ") + text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function processInput(message) {
  if (!userName) {
    userName = message.charAt(0).toUpperCase() + message.slice(1);
    setTimeout(() => {
      addMessage("bot", `¡Genial, ${userName}! ¿En qué puedo ayudarte?`);
    }, 500);
    return;
  }

  let response = getBotResponse(message);
  if (response) {
    setTimeout(() => {
      addMessage("bot", response);
    }, 500);
  } else {
    searchWikipedia(message);
  }
}

function getBotResponse(message) {
  if (message.includes("hola")) return `¡Hola ${userName}! ¿Listo para programar?`;
  if (message.includes("chiste")) return "¿Por qué el computador fue al médico? ¡Porque tenía un virus! 🦠";
  if (message.includes("curiosidad")) return "¿Sabías que el lenguaje Python fue nombrado por el show de comedia Monty Python?";
  if (message.includes("github")) return "Aquí está mi GitHub: https://github.com/devjuan";
  if (message.includes("frase") || message.includes("motiva")) return "¡Sigue luchando por tus sueños, devjuan! 💪";

  const knowledge = {
    "quien fundo roma": "Según la leyenda, Roma fue fundada por Rómulo y Remo.",
    "que es html": "HTML es el lenguaje de marcado que estructura las páginas web.",
    "que es css": "CSS es el lenguaje que da estilo a las páginas web.",
    "que es javascript": "JavaScript es el lenguaje que da interactividad a las páginas web.",
    "cuando fue la segunda guerra mundial": "La Segunda Guerra Mundial ocurrió de 1939 a 1945.",
    "quien creo python": "Python fue creado por Guido van Rossum en 1991."
  };

  for (const key in knowledge) {
    if (message.includes(key)) return knowledge[key];
  }

  return null; // No encontró respuesta directa, pasará a buscar en Wikipedia
}

function searchWikipedia(query) {
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.extract) {
        addMessage("bot", data.extract);
      } else {
        addMessage("bot", `Lo siento ${userName}, no encontré nada sobre eso.`);
      }
    })
    .catch((err) => {
      console.error(err);
      addMessage("bot", "Hubo un error al buscar en Wikipedia.");
    });
}
