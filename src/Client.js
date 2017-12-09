module.exports = function Client (name, agent, id, hash) {
  /**
   * Nazwa użytkownika zachowywana do wykonywania żądań do API
   * @memberof Client
   * @type {string}
   */
  this.name = name

  /**
   * Numer ID użytkownika zachowywany do wykonywania żądań do API
   * @memberof Client
   * @type {number}
   */
  this.id = id

  /**
   * Klient HTTPS przekazywany z funkcji logowania
   * @memberof Client
   * @type {object}
   */
  this.agent = agent

  /**
   * Hash hasła użytkownika
   * @memberof Client
   * @type {string}
   */
  this.hash = hash

  /**
   * Funkcja pobierająca oceny
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.oceny = require('./client/oceny')

  /**
   * Funkcja pobierająca uwagi
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.uwagi = require('./client/uwagi')

  /**
   * Funkcja pobierająca plan
   * @function
   * @memberof Client
   * @param {Date} date Obiekt daty, na podstawie którego wyznaczane są zastępstwa na dany tydzień
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.plan = require('./client/plan')

  /**
   * Funkcja pobierająca dostępnych odbiorców wiadomości
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.odbiorcy = require('./client/odbiorcy')

  /**
   * Funkcja pobierająca wiadomość
   * @function
   * @memberof Client
   * @param {string} id ID wiadomości
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.wiadomosc = require('./client/wiadomosc')

  /**
   * Funkcja pobierająca pracowników zewnętrznej jednostki
   * @function
   * @memberof Client
   * @param {number} id ID jednostki
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.pracownicyJednostki = require('./client/pracownicyJednostki')

  /**
   * Funkcja pobierająca listę odebranych wiadomości
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.odebrane = require('./client/odebrane')

  /**
   * Funkcja pobierająca listę wysłanych wiadomości
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.wyslane = require('./client/wyslane')

  /**
   * Funkcja wysyłająca wiadomość
   * @function
   * @memberof Client
   * @param {string} odbiorca ID odbiorcy
   * @param {string} temat Temat wiadomości
   * @param {string} tresc Treść wiadomości
   * @param {boolean} potwierdzenie Żądanie potwierdzenia przeczytania
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.wyslij = require('./client/wyslij')

  /**
   * Funkcja pobierająca obecności z danego miesiąca
   * @function
   * @memberof Client
   * @param {Date} date Data na podstawie której obliczany jest miesiąc obecności
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.obecnosci = require('./client/obecnosci')

  /**
   * Funkcja pobierająca prace domowe z całego roku szkolnego
   * @function
   * @memberof Client
   * @param {Date} date Data na podstawie której wyznaczany jest rok szkolny
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.praceDomowe = require('./client/praceDomowe')

  /**
   * Funkcja pobierająca treść pracy domowej
   * @function
   * @memberof Client
   * @param {number} id ID pracy domowej
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.pracaDomowa = require('./client/pracaDomowa')

  /**
   * Funkcja pobierająca sprawdziany z danego miesiąca
   * @function
   * @memberof Client
   * @param {Date} date Data na podstawie której wyznaczany jest miesiąc
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.sprawdziany = require('./client/sprawdziany')

  /**
   * Funkcja pobierająca brakujące oceny z całego roku szkolnego
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.brakujaceOceny = require('./client/brakujaceOceny')

  /**
   * Funkcja pobierająca wydarzenia z całego roku szkolnego
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.wydarzenia = require('./client/wydarzenia')

  /**
   * Funkcja pobierająca terminy wycieczek z całego roku szkolnego
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.wycieczki = require('./client/wycieczki')

  /**
   * Funkcja pobierająca terminy egzaminów z całego roku szkolnego
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.egzaminy = require('./client/egzaminy')

  /**
   * Funkcja pobierająca listę podręczników na dany rok szkolny
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.podreczniki = require('./client/podreczniki')

  /**
   * Funkcja kasująca wiadomość z listy wiadomości
   * @function
   * @memberof Client
   * @returns {object} Obiekt z danymi pobranymi z API
   */
  this.skasujWiadomosc = require('./client/skasujWiadomosc')

  /**
   * Funkcja zwracająca hash hasła użytkownika
   * @function
   * @memberof Client
   * @returns {string} Hash hasła użytkownika
   */
  this.getHash = () => {
    return this.hash
  }
}
