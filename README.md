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
Pobiera oceny, zwraca [obiekt](https://github.com/Bjornskjald/idziennik/blob/master/docs/client.oceny.md)
```javascript
client.oceny().then(result => {
	// ...
})
```


#### client.uwagi
Pobiera listę uwag
```javascript
client.uwagi().then(result => {
	// ...
})
```

#### client.plan
Pobiera plan lekcji na dany tydzień
```javascript
client.plan(new Date()).then(result => {
	// ...
})
```

#### client.odbiorcy
Pobiera dostępnych odbiorców dla wysyłania wiadomości
```javascript
client.odbiorcy().then(result => {
	// ...
})
```

#### client.wiadomosc
Pobiera pojedynczą wiadomość z listy
```javascript
// typeof messageID === 'string' && messageID.length === 15
client.wiadomosc(messageID).then(result => { 
	// ...
})
```

#### client.pracownicyJednostki
Pobiera listę pracowników zewnętrznej jednostki
```javascript
// typeof idJednostki === 'number'
client.pracownicyJednostki(idJednostki).then(result => {
	// ...
})
```

#### client.odebrane
Pobiera listę odebranych wiadomości
```javascript
client.odebrane().then(result => {
	// ...
})
```

#### client.wyslane
Pobiera listę wysłanych wiadomości
```javascript
client.wyslane().then(result => {
	// ...
})
```

#### client.wyslij
Wysyła wiadomość
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
Pobiera listę (nie)obecności na dany miesiąc
```javascript
client.obecnosci(new Date()).then(result => {
	// ...
})
```

#### client.praceDomowe
Pobiera prace domowe z całego roku szkolnego
```javascript
client.praceDomowe().then(result => {
	// ...
})
```

#### client.pracaDomowa
Pobiera treść pojedynczej pracy domowej
```javascript
// typeof IDPracy === 'number'
client.pracaDomowa(IDPracy).then(result => {
	// ...
})
```

#### client.sprawdziany
Pobiera listę sprawdzianów na dany miesiąc
```javascript
client.sprawdziany(new Date()).then(result => {
	// ...
})
```

#### client.brakujaceOceny
Pobiera listę brakujących ocen
```javascript
client.brakujaceOceny().then(result => {
	// ...
})
```

#### client.wydarzenia
Pobiera listę wydarzeń w roku szkolnym
```javascript
client.wydarzenia().then(result => {
	// ...
})
```

#### client.wycieczki
Pobiera listę wycieczek roku szkolnym
```javascript
client.wycieczki().then(result => {
	// ...
})
```

#### client.egzaminy
Pobiera listę egzaminów OKE w roku szkolnym
```javascript
client.egzaminy().then(result => {
	// ...
})
```

#### client.podreczniki
Pobiera listę podręczników na dany rok szkolny
```javascript
client.podreczniki().then(result => {
	// ...
})
```



#### Otrzymanie danych do wczytania (TODO)
```javascript
client.getAppState(); 
```

