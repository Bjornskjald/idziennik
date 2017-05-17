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
const idziennik = require('idziennik');
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
	// ...
})
```


#### client.uwagi

```javascript
client.uwagi().then(result => {
	// ...
})
```

#### client.plan

```javascript
client.plan(new Date()).then(result => {
	// ...
})
```

#### client.odbiorcy

```javascript
client.odbiorcy().then(result => {
	// ...
})
```

#### client.wiadomosc

```javascript
// typeof messageID === 'string' && messageID.length === 15
client.wiadomosc(messageID).then(result => { 
	// ...
})
```

#### client.pracownicyJednostki

```javascript
// typeof idJednostki === 'number'
client.pracownicyJednostki(idJednostki).then(result => {
	// ...
})
```

#### client.odebrane

```javascript
client.odebrane().then(result => {
	// ...
})
```

#### client.wyslane

```javascript
client.wyslane().then(result => {
	// ...
})
```

#### client.wyslij

```javascript
// typeof odbiorca === 'string'
// typeof temat === 'string'
// typeof tresc === 'string'
// typeof potwierdzenie === 'boolean'
client.wyslij(odbiorca, temat, tresc, potwierdzenie).then(result => {
	// ...
})
```

#### client.obecnosci

```javascript
client.obecnosci(new Date()).then(result => {
	// ...
})
```

#### client.praceDomowe

```javascript
client.praceDomowe().then(result => {
	// ...
})
```

#### client.pracaDomowa

```javascript
// typeof IDPracy === 'number'
client.pracaDomowa(IDPracy).then(result => {
	// ...
})
```

#### client.sprawdziany

```javascript
client.sprawdziany(new Date()).then(result => {
	// ...
})
```

#### client.brakujaceOceny

```javascript
client.brakujaceOceny().then(result => {
	// ...
})
```

#### client.wydarzenia

```javascript
client.wydarzenia().then(result => {
	// ...
})
```

#### client.wycieczki

```javascript
client.wycieczki().then(result => {
	// ...
})
```

#### client.egzaminy

```javascript
client.egzaminy().then(result => {
	// ...
})
```

#### client.podreczniki

```javascript
client.podreczniki().then(result => {
	// ...
})
```



#### Otrzymanie danych do wczytania (TODO)
```javascript
client.getAppState(); 
```

