/** Biblioteka crypto-js jest wymagana do "zaszyfrowania" hasła, czego wymaga Portal Edukacyjny przy logowaniu */
const cryptojs = require('crypto-js')

/**
 * Funkcja zwracająca ciąg znaków do zalogowania się
 * @function
 * @param {string} md5 Hash MD5 wygenerowany z nazwy użytkownika i hasła
 * @param {string} hmac Wartość podana przez Portal Edukacyjny
 * @returns {string} Ciąg znaków wymagany do logowania
 */
const crypto = require('../utils/crypto')

/** Moduł iDziennik używa superagent jako klienta HTTP(S) (zmiana z request-promise-native) */
const request = require('superagent')

module.exports = params => {
  // {name, pass, hash, debug}
  return new Promise((resolve, reject) => {
    var debug = msg => { if (params.debug) console.log(msg) }

    debug('Pobieram ciastko...')

    var agent = request.agent()

    var token

    agent
    .get('https://pe.szczecin.pl/chapter_201208.asp?wa=wsignin1.0&wtrealm=https://sisso.pe.szczecin.pl:443/LoginPage.aspx')
    .then(response => {
      var formdata
      if (!response.text.includes('" name="token" value="')) {
        debug('Nie mam tokena, probuje pobrac')
        try {
          if (typeof params.hash === 'string') {
            debug('Loguje sie hashem')
            formdata = {passworddata: crypto(params.hash, response.text.split('asecretpasswordhash')[2].split('"')[1]), username: params.username}
          } else {
            debug('Loguje sie haslem')
            formdata = {passworddata: crypto(cryptojs.MD5(params.username.toLowerCase() + params.password).toString(cryptojs.enc.Hex), response.text.split('asecretpasswordhash')[2].split('"')[1]), username: params.username}
          }
        } catch (err) {
          throw err
        }
      } else {
        debug('Mam token, ide dalej')
        formdata = {}
        try {
          token = response.text.split('token" value')[1].split('"')[1]
        } catch (err) {
          throw err
        }
      }
      return agent
      .post('https://pe.szczecin.pl/chapter_201208.asp')
      .type('form')
      .send(formdata)
    }).then(response => {
      debug('Stage 2')
      if (typeof token !== 'string') {
        if (response.text.includes('504')) {
          throw new Error('Incorrect password.')
        }
        try {
          token = response.text.split('token" value')[1].split('"')[1]
        } catch (err) {
          throw err
        }
      }
      return agent
      .post('https://sisso.pe.szczecin.pl:443/LoginPage.aspx')
      .type('form')
      .send({token: token})
    }).then(response => {
      debug('Stage 3')
      token = ''
      if (!response.text.includes(params.username.toUpperCase()) && !response.text.includes(params.username.toLowerCase()) && !response.text.includes('Token logowania')) {
        console.log(JSON.stringify(response))
        throw new Error('Failed on logging in')
      }
      return agent
      .get('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/Oceny.aspx')
    }).then(response => {
      debug('Stage 4')
      if (response.request.url === 'https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/Oceny.aspx' && !response.text.includes('Working...')) {
        resolve({agent: agent, id: response.text.split('selected="selected" value="')[1].split('">')[0], hash: cryptojs.MD5(params.username.toLowerCase() + params.password).toString(cryptojs.enc.Hex)})
      }
      try {
        var wres = response.text.split('wresult" value="')[1].split('"')[0].replace(/&lt;/g, '<').replace(/&quot;/g, '"')
      } catch (err) {
        throw err
      }
      return agent
      .post('https://iuczniowie.pe.szczecin.pl/Default.aspx')
      .type('form')
      .send({wa: 'wsignin1.0', wresult: wres, wctx: 'rm=0&amp;id=passive&amp;ru=%2fmod_panelRodzica%2fOceny.aspx'})
    }).then(response => {
      debug('Stage 5')
      debug(response.request.url)
      if (response.request.url !== 'https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/Oceny.aspx') {
        /* throw new Error('Failed on scraping main page.')
        return */
        return agent.get('https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/Oceny.aspx')
      }
      debug('Skończyłem pobierać ciastko')
      resolve({agent: agent, id: response.text.split('selected="selected" value="')[1].split('">')[0], hash: cryptojs.MD5(params.username.toLowerCase() + params.password).toString(cryptojs.enc.Hex)})
    }).then(response => {
      if (response.request.url !== 'https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/Oceny.aspx') {
        throw new Error('Failed on scraping main page. (' + response.request.url + ')')
      }
      resolve({agent: agent, id: response.text.split('selected="selected" value="')[1].split('">')[0], hash: cryptojs.MD5(params.username.toLowerCase() + params.password).toString(cryptojs.enc.Hex)})
    }).catch(err => {
      reject(err)
    })
  })
}
