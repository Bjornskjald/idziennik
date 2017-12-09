module.exports = function (id) {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/pracaDomowa/WS_pracaDomowa.asmx/pobierzJednaPraceDomowa')
    .send({idP: this.id, idPD: id})
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}