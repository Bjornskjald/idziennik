module.exports = function () {
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/PobierzListeWiadomosci')
    .send({
      param: {
        strona: 1,
        iloscNaStrone: 65535,
        iloscRekordow: 65535,
        kolumnaSort: 'Data_nadania',
        kierunekSort: 1,
        maxIloscZaznaczonych: 0,
        panelFiltrow: 1,
        parametryFiltrow: [{idKolumny: 'w.Typ_wiadomosci', paramWartosc: '0'}]
      }
    })
    .then(response => {
      resolve(JSON.parse(response.text).d)
    })
    .catch(err => {
      reject(err)
    })
  })
}