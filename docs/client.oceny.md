## Przykład obiektu pobranego z API:

```javascript
{ __type: 'mds.Web.oceny.WS_ocenyUcznia+OcenyUcznia', // string
	PokazSrednia: true, // bool
	PokazSredniaSem0: false, // bool
	WarSredniaOcen: true, // bool
	TypOceniania: 3, // int
	JakaSrednia: '2', // string
	IloscSemestrow: 2, // int
	WybranySemestr: 2, // int
	Przedmioty: [ // array
		{ // object
			Przedmiot: 'Nazwa przedmiotu', // string
			opisowy: false, // bool
			Oceny: [ // array
				{ // object
					Semestr: 1, // int
					Ocena: '6', // string
					WartoscDoSred: 6, // int
					Kategoria: 'Kategoria oceny', // string
					idK: 9999999, // int
					Waga: 2, // int
					Wystawil: 'Imię i nazwisko nauczyciela', // string
					Data_wystaw: '2017-02-31', // string
					DoSredniej: true, // bool
					Kolor: '000000', // int (kolor hex)
					Slownie: null, // string/null
					typOczekiwan: 0, // int
					punkty: 0, // int
					Typ: 0, // int
					Uzasadnienie: '', // string
					Historia: [], // array
					MaxIloscPunktow: 0, // int
					MinIloscPunktow: 0, // int
					UzasadnienieOceny: '' // string
				}, // ...
			],
			SrednieWSemestrach: [ '6,00', '6,00' ], // array (int)
			SrednieCaloroczne: '6,00', // int
			PunktyWSemestrach: null, // null
			WymuszonyTypOceniania: null, // null
			IdPrzedmiotu: 1234 // int
		}, // ...
	]
}
```
