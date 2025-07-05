window.addEventListener("load", () => {
  addMessage("bot", "¡Hola! ¿Cómo te llamas?");
});
function searchWikipedia(rawQuery) {
  let query = rawQuery
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[¿?]/g, "")
    .replace(/(quien fue|quien es|que es|cual es|dime sobre|hablame de) /g, "")
    .trim();

  const correcciones = {
    "pabllo escbar": "pablo escobar",
    "pablo escbar": "pablo escobar",
    "cleopatra": "Cleopatra",
    "roma": "Roma",
    "empresa mas grande de colombia": "Ecopetrol"
  };

  if (correcciones[query]) {
    query = correcciones[query];
  }

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
      addMessage("bot", "Ocurrió un error buscando en Wikipedia.");
    });
}
