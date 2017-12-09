module.exports = function () {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/plan/WS_Plan.asmx/pobierzPlanZajec')
    .send({idPozDziennika: this.id, data: date, pidRokSzkolny: 17})
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}