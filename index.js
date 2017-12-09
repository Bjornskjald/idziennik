/**
 * @fileOverview Główny plik modułu
 * @author Bjornskjald
 * @version 4.3.0
 */

/** Biblioteka crypto-js jest wymagana do "zaszyfrowania" hasła, czego wymaga Portal Edukacyjny przy logowaniu */
const cryptojs = require('crypto-js')

/**
 * Funkcja zwracająca ciąg znaków do zalogowania się
 * @function
 * @param {string} md5 Hash MD5 wygenerowany z nazwy użytkownika i hasła
 * @param {string} hmac Wartość podana przez Portal Edukacyjny
 * @returns {string} Ciąg znaków wymagany do logowania
 */
const crypto = require('./utils/crypto')

/** Moduł iDziennik używa superagent jako klienta HTTP(S) (zmiana z request-promise-native) */
const request = require('superagent')

/**
 * Funkcja sprawdzająca poprawność podanych danych
 * @function
 * @param {object} params Parametry logowania
 * @returns {object} Obiekt z danymi do przekazania dla klienta
 * @throws Jeżeli wystąpi błąd w trakcie logowania (np. nieprawidłowe hasło) to zwraca go w postaci klasy Error
 */
const login = require('./src/login')

/**
 * Główny klient zwracany z funkcji logowania
 * @constructor
 * @param {string} name - nazwa użytkownika
 * @param {object} agent - klient HTTPS przekazywany z funkcji logowania
 * @param {number} id - numer ID użytkownika
 * @param {string} hash - hash hasła użytkownika
 */
const Client = require('./src/Client')

/** Główna funkcja modułu.
 * @function
 * @param {object} object obiekt z danymi przekazywany do funkcji
 * @returns {Client} Klient pobierający dane z API
 * @throws Jeżeli parametr nie jest obiektem, to wyrzuca błąd
 */
function main (params) {
  return new Promise((resolve, reject) => {
    var debug = typeof params.debug === 'boolean' ? params.debug : false

    if (typeof params !== 'object') {
      if (debug) console.log('Format ze starej wersji.')
      /** @throws Dane powinny być podane w formie obiektu, a nie są. */
      reject(new Error('Nieprawidłowy format danych.'))
      return
    }
    if (
      (typeof params.username === 'string' && 
        (params.username !== '' && params.username !== ' ')
      ) &&
      (
        (typeof params.password === 'string' &&
          (params.password !== '' && params.password !== ' ')
        ) ||
        (typeof params.hash === 'string' &&
          (params.hash !== '' && params.hash !== ' ')
        )
      )
    ) {
      if (debug) console.log('Loguję...')
      login(params).then(o => {
        resolve(new Client(params.username, o.agent, o.id, o.hash))
      }).catch(e => {
        reject(e)
      })
    } else {
      reject(new Error('Nieprawidłowy format danych.'))
    }
  })
}

module.exports = main
