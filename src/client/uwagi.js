module.exports = function () {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/uwagi/WS_uwagiUcznia.asmx/pobierzUwagiUcznia')
    .send({idPozDziennika: this.id})
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}
