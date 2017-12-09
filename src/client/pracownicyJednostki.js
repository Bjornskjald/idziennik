module.exports = function (id) {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/pobierzPracownikowDlaWybranejJedn')
    .send({idJednostkiNad: id})
    .then(response => {
      resolve(JSON.parse(response.text).d)
    }).catch(err => {
      reject(err)
    })
  })
}