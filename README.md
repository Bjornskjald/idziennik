# idziennik
## Moduł API iDziennika dla Node.js

### Instalacja

##### Wersja stabilna:
```
npm install idziennik
```

##### Najnowsza wersja:
```
npm install Bjornskjald/idziennik
```

### Używanie:

```javascript
const idziennik = require('idziennik')
```

### Funkcje:

Wszystkie funkcje zwracają obiekt ze statusem (oraz danymi pobranymi z API)

#### Logowanie:
```javascript
idziennik.login('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success'}
})
```

#### Pobieranie ocen
```javascript
idziennik.oceny('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

#### Pobieranie uwag
```javascript
idziennik.uwagi('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```
#### Pobieranie planu lekcji
```javascript
idziennik.plan('nazwaUzytkownika', 'haslo', new Date()).then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

#### Pobieranie dostępnych odbiorców wiadomości na komunikatorze
```javascript
idziennik.odbiorcy('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```

#### Pobieranie pojedynczej wiadomości z komunikatora
```javascript
idziennik.wiadomosc('nazwaUzytkownika', 'haslo', messageID).then(result => {
	console.log(result); // {status: 'success', data: {d: {...}}}
})
```

#### Pobieranie listy pracowników danej jednostki
```javascript
idziennik.pracownicyJednostki('nazwaUzytkownika', 'haslo', idJednostki).then(result => {
	console.log(result); // {status: 'success', data: {d: {...}}}
})
```

#### Pobieranie listy odebranych wiadomości na komunikatorze
```javascript
idziennik.odebrane('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result); // {status: 'success', data: {d: {...}}}
})
```

#### Pobieranie listy wysłanych wiadomości na komunikatorze
```javascript
idziennik.wyslane('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result); // {status: 'success', data: {d: {...}}}
})
```

#### Otrzymanie danych do zapisania (ciastka, tokeny)
```javascript
idziennik.getData(); // {'nazwaUzytkownika': {'pass': 'haslo', 'token': 'aAbBcCdDeEfFgGhH', 'jar': {...}}}
```

#### Ładowanie danych aplikacji otrzymanych przy użyciu funkcji getData()
```javascript
idziennik.loadData(data);
```