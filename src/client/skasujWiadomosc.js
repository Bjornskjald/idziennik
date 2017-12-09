module.exports = function (list) {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/SkasujWiadomosc')
    .send({listaIdWiadomosci: list})
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}
