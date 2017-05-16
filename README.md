# idziennik
## Moduł API iDziennika dla Node.js

#### Używanie:

```javascript
const idziennik = require('idziennik')

// Przykładowe logowanie
// Zwraca objekt ze statusem "success" lub opisem błędu
idziennik.login('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success'}
})

// Pobieranie ocen
// Zwraca obiekt zawierający status i dane z API dziennika
idziennik.oceny('nazwaUzytkownika', 'haslo').then(result => {
	console.log(result) // {status: 'success', data: {d: {...}}}
})
```
