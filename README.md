# idziennik
## Moduł API iDziennika dla Node.js

Aplikacja domyślnie używa pliku "userdata.json" w katalogu głównym do zapisywania/odczytywania danych

### Używanie:

```javascript
const idziennik = require('idziennik')
```

### Funkcje:
#### Wszystkie funkcje zwracają obiekt ze statusem (oraz danymi pobranymi z API)

```javascript
// Przykładowe logowanie
idziennik.login('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success'}
})
```

```javascript
// Pobieranie ocen
idziennik.oceny('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Pobieranie uwag
idziennik.uwagi('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Pobieranie planu lekcji
idziennik.plan('nazwaUzytkownika', 'haslo', new Date()).then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Pobieranie dostępnych odbiorców wiadomości na komunikatorze
idziennik.odbiorcy('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Pobieranie pojedynczej wiadomości z komunikatora
idziennik.wiadomosc('nazwaUzytkownika', 'haslo', messageID).then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Pobieranie listy pracowników danej jednostki
idziennik.pracownicyJednostki('nazwaUzytkownika', 'haslo', idJednostki).then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Pobieranie listy odebranych wiadomości na komunikatorze
idziennik.odebrane('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Pobieranie listy wysłanych wiadomości na komunikatorze
idziennik.wyslane('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

```javascript
// Zapisywanie danych przy wyłączaniu aplikacji do pliku userdata.json
idziennik.save()
```