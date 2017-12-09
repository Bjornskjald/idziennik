module.exports = function (odbiorca, temat, tresc, potwierdzenie) {
  function guid () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }
  return new Promise((resolve, reject) => {
    this.agent
    .post('https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/WyslijWiadomosc')
    .send({
      Wiadomosc: {
        Tytul: temat,
        Tresc: tresc,
        Confirmation: potwierdzenie,
        GuidMessage: guid(),
        Odbiorcy: typeof odbiorca === 'string' ? [odbiorca] : odbiorca
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
