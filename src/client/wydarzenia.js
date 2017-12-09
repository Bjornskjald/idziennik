module.exports = function () {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/wwE/WS_wwE.asmx/pobierzWydarzeniaUcznia')
    .send({
      param: {
        strona: 1,
        iloscNaStrone: 999,
        iloscRekordow: -1,
        kolumnaSort: 'Data',
        kierunekSort: 1,
        maxIloscZaznaczonych: 0,
        panelFiltrow: 0,
        parametryFiltrow: null
      },
      idP: this.id
    })
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}