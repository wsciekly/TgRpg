var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    //odpowiedz serwera czyli wyslanie pliku index.html do przegladarki
    response.sendFile(__dirname + '/public/index.html');
});

router.get('/hello', function (req, res) {
    res.send("Wywołałeś metode post z parametrem /hello!");
});
router.get('/tablica' , function(req , res) {
    res.sendFile(__dirname + '/public/canvas.html');
});
//Dynamiczny routing...
//po public/ moze byc tylko jedna liczba z zakresu 1-9
router.get('/:id([0-9]{1})', function (req, res) {
    res.send('the id you specified is' + req.params.id);
});

//routing z parametrami
router.get('/:name/:id', function (req, res) {
    res.send('Imie:' + req.params.name + ' and ID:' + req.params.id);
});

//nie znaleziono pasujacego linku
//TO MUSI BYĆ NA KONCU! odpala jak express nie znajdzie odpowiednieo routa!
router.get('*', function (req, res) {
    res.send('Przykro mi.Nie znaleziono żądanego elemntu...');
});
module.exports = router;