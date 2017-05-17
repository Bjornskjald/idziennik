# idziennik
## Moduł API iDziennika dla Node.js

### Uwaga! Moduł działa tylko z dziennikiem na Portalu Edukacyjnym (pe.szczecin.pl)!

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

Wszystkie funkcje zwracają obiekt z danymi pobranymi z API
Schematy obiektów znajdują się w folderze docs/

#### Logowanie:
```javascript
idziennik({username: 'nazwaUzytkownika', password: 'haslo'}).then(client => {
	// Funkcje klienta poniżej
})
```

#### client.oceny

```javascript
client.oceny().then(result => {
	console.log(result)
})
```


#### client.uwagi

```javascript
client.uwagi().then(result => {
	console.log(result);
})
```

#### client.plan

```javascript
client.plan(new Date()).then(result => {
	console.log(result);
})
```

#### client.odbiorcy

```javascript
client.odbiorcy().then(result => {
	console.log(result);
})
```

#### client.wiadomosc

```javascript
// typeof messageID === 'string' && messageID.length === 16
client.wiadomosc(messageID).then(result => { 
	console.log(result);
})
```

#### client.pracownicyJednostki

```javascript
// typeof idJednostki === 'number'
client.pracownicyJednostki(idJednostki).then(result => {
	console.log(result); // {status: 'success', data: {d: {...}}}
})
```

#### client.odebrane

```javascript
client.odebrane().then(result => {
	console.log(result); // {status: 'success', data: {d: {...}}}
})
```

#### client.wyslane

```javascript
client.wyslane().then(result => {
	console.log(result);
})
```

#### Otrzymanie danych do wczytania (TODO)
```javascript
client.getAppState(); 
```
