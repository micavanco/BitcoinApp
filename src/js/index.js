import './../css/stylesheet.css';


console.log('TESTUJEMY CZY DZIAŁA WEBPACK');

fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/info", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
		"x-rapidapi-key": "49dea57d2emshbe7ef5e6d5deb1bp1b808ajsn4d6f70b73f91"
	}
})
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(err => {
	console.log(err);
});
