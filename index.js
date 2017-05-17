const 	fs = require('fs'),
		cryptojs = require('crypto-js');

const debug = false; // Jeżeli chcesz włączyć dodatkowe informacje zmień "false" na "true"

const rp = require('request-promise').defaults({followAllRedirects: true});

module.exports = (object) => {
	return new Promise((resolve, reject) => {
		if(typeof object !== 'object'){ // Jeżeli główny obiekt nie jest obiektem
			if(debug) console.log('Format ze starej wersji.');
			reject(new Error('Nieprawidłowy format danych.'))
		}
		if(typeof object.username !== 'string' || typeof object.password !== 'string') { // Jeżeli nazwa i hasło nie są stringami
			/*if(typeof object.appstate === 'object'){ // Jeżeli jest podany appstate
				if(debug) console.log('Importuję dane...');
				checkLoggedIn(object.appstate.username, '', object.appstate.jar, object.appstate.id).then(o => {
					resolve(new Client(object.appstate.username, o.jar, object.appstate.id))
				});
			} else {
				reject(new Error('Nieprawidłowy format danych.'))
			}*/
			reject(new Error('Nieprawidłowy format danych.'))
		} else {
			if(debug) console.log('Loguję...')
			checkLoggedIn(object.username, object.password).then(o => {
				resolve(new Client(object.name, o.jar, o.id))
			}).catch(e => {
				reject(e)
			})
		}
	})
}
function Client(name, jar, id){
	this.name = name;
	this.jar = jar;
	this.id = id;
	this.oceny = () => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/oceny/WS_ocenyUcznia.asmx/pobierzOcenyUcznia',
				body: {idPozDziennika: this.id}, 
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.uwagi = () => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/uwagi/WS_uwagiUcznia.asmx/pobierzUwagiUcznia',
				body: {idPozDziennika: this.id}, 
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.plan = (date) => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/plan/WS_Plan.asmx/pobierzPlanZajec',
				body: {idPozDziennika: this.id, data: date, pidRokSzkolny: 16}, 
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.odbiorcy = () => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/pobierzListeOdbiorcow',
				body: {},
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.wiadomosc = (id) => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/PobierzWiadomosc',
				body: {idWiadomosci: id, typWiadomosci: 0},
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.pracownicyJednostki = (idjednostki) => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/pobierzPracownikowDlaWybranejJedn',
				body: {idJednostkiNad: idjednostki}, 
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.odebrane = () => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/PobierzListeWiadomosci ',
				body: {
					param: {
						strona: 1,
						iloscNaStrone: 30,
						iloscRekordow: -1,
						kolumnaSort: "Data_nadania",
						kierunekSort: 1,
						maxIloscZaznaczonych: 0,
						panelFiltrow: 1,
						parametryFiltrow: [{idKolumny:"w.Typ_wiadomosci",paramWartosc:"0"}]
					}
				},
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.wyslane = (name, pass) => {
		return new Promise((resolve, reject) => {
			rp({
				uri: 'https://iuczniowie.pe.szczecin.pl/mod_komunikator/WS_wiadomosci.asmx/PobierzListeWiadomosci ',
				body: {
					param: {
						strona: 1,
						iloscNaStrone: 30,
						iloscRekordow: -1,
						kolumnaSort: "Data_nadania",
						kierunekSort: 1,
						maxIloscZaznaczonych: 0,
						panelFiltrow: 1,
						parametryFiltrow: [{idKolumny:"w.Typ_wiadomosci",paramWartosc:"1"}]
					}
				},
				json: true, method: 'POST',
				jar: this.jar
			}).then(response => {
				resolve(response.d);
			}).catch(err => {
				reject(err);
			})
		})
	},
	this.getAppState = () => {
		return {id: this.id, jar: this.jar, name: this.name}
	}
}

function checkLoggedIn(name, pass, importedjar, importedid) {
		return new Promise((resolve, reject) => {
			var jar = typeof importedjar === 'object' ? importedjar : rp.jar()
			var loggedInWithAppState = typeof importedjar === 'object'
			rp({
				uri: 'https://pe.szczecin.pl/chapter_201208.asp?wa=wsignin1.0&wtrealm=https://sisso.pe.szczecin.pl:443/LoginPage.aspx',
				jar: jar, resolveWithFullResponse: true
			}).then(response => {
				if(debug) console.log(response.request.href)
				if(response.request.href === 'https://sisso.pe.szczecin.pl/Default.aspx' || response.body.includes('token" value="')){
					if(debug) console.log('id jest & uzytkownik zalogowany');
					resolve({jar: jar})
				} else {
					if(loggedInWithAppState){
						reject(new Error('Cookie expired.'))
						return
					}
					var skiptoken = false;
					if(!response.body.includes('" name="token" value="')){
						if(debug) console.log('Nie mam tokena, probuje pobrac')
						try {
							var formdata = {passworddata: crypto(name, pass, response.body.split('asecretpasswordhash')[2].split('\"')[1]), username: name}
						}
						catch(err) {
							reject(err)
							return
						}
					} else {
						if(debug) console.log('Mam token, ide dalej')
						var formdata = {}
						var token = response.body.split('token" value')[1].split('\"')[1]
						skiptoken = true
					}

					rp({
						uri: 'https://pe.szczecin.pl/chapter_201208.asp',
						method: 'POST', form: formdata, jar: jar
					}).then(body => {
						if(!skiptoken){
							if(typeof body.split('token\" value')[1] === 'undefined'){
								if(body.includes('504')){
									reject(new Error('Incorrect password.'))
									return
								} else {
									reject(new Error('Unknown error.'))
									return
								}
							}
							var token = body.split('token" value')[1].split('\"')[1]
							if(debug) console.log(token);
						} else {
							skiptoken = false;
						}
						rp({
							uri: 'https://sisso.pe.szczecin.pl:443/LoginPage.aspx',
							method: 'POST', form: {token: token}, jar: jar
						}).then(body => {
							if(!body.includes(name.toUpperCase())){
								reject(new Error('Failed on logging in.'))
								return
							}
							rp({
								uri: 'https://iuczniowie.pe.szczecin.pl/mod_panelRodzica/Oceny.aspx',
								jar: jar
							}).then(body => {
								var wres = body.split('wresult\" value=\"')[1].split('\"')[0].replace(/&lt;/g, '<').replace(/&quot;/g, '"')
								rp({
									uri: 'https://iuczniowie.pe.szczecin.pl/Default.aspx',
									form: {wa: 'wsignin1.0', wresult: wres, wctx: 'rm=0&amp;id=passive&amp;ru=%2fmod_panelRodzica%2fOceny.aspx'},
									method: 'POST', jar: jar, resolveWithFullResponse: true
								}).then(response => {
									if(debug) console.log(response.request.uri.pathname)
									if(response.request.uri.pathname !== '/mod_panelRodzica/Oceny.aspx'){
										reject('Failed on scraping main page.')
										return
									}
									if(debug) console.log('Skończyłem pobierać ciastko')
									resolve({jar: jar, id: response.body.split('selected="selected" value="')[1].split('">')[0]})
								})
							})
						})
					})
				}
			})
		})
	}

function crypto(name, password, hmac){
	return cryptojs.HmacMD5(cryptojs.MD5(name.toLowerCase()+password).toString(cryptojs.enc.Hex), hmac).toString(cryptojs.enc.Hex);	
}