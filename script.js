function searchWikipedia(rawQuery) {
  let query = rawQuery
    .toLowerCase()
    .replace(/[¿?]/g, "") // quita signos de pregunta
    .replace(/quien fue |quien es |que es |cual es /g, "") // elimina frases comunes
    .trim();

  // Corrección manual de errores comunes (puedes agregar más)
  const correcciones = {
    "pabllo escbar": "pablo escobar",
    "pablo escbar": "pablo escobar",
    "romulo y remo": "Rómulo y Remo",
    "empresa mas grande de colombia": "Empresa más grande de Colombia",
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
      addMessage("bot", "Hubo un error al buscar en Wikipedia.");
    });
}
