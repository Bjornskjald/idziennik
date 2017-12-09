module.exports = function (date) {
  date.setHours(date.getHours() - date.getTimezoneOffset() / 60)
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/pracaDomowa/WS_pracaDomowa.asmx/pobierzPraceDomowe')
    .send({
      param: {
        strona: 1,
        iloscNaStrone: 999,
        iloscRekordow: -1,
        kolumnaSort: 'DataOddania',
        kierunekSort: 0,
        maxIloscZaznaczonych: 0,
        panelFiltrow: 0,
        parametryFiltrow: null
      },
      idP: this.id,
      data: date.toJSON().split('T')[0],
      wszystkie: true
    })
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}