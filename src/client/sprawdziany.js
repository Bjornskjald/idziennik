module.exports = function (date) {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/sprawdziany/mod_sprawdzianyPanel.asmx/pobierzListe')
    .send({
      param: {
        strona: 1,
        iloscNaStrone: 99,
        iloscRekordow: -1,
        kolumnaSort: 'ss.Nazwa,sp.Data_sprawdzianu',
        kierunekSort: 0,
        maxIloscZaznaczonych: 0,
        panelFiltrow: 0,
        parametryFiltrow: null
      },
      idP: this.id,
      miesiac: (date.getMonth() + 1).toString(),
      rok: date.getFullYear().toString()
    })
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}
