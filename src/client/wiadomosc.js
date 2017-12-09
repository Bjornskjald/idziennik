module.exports = function (id) {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/PobierzWiadomosc')
    .send({idWiadomosci: id, typWiadomosci: 0})
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}
