//Niezbedne biblioteki/komponenty aplikacji
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function (request, response) {
    //odpowiedz serwera czyli wyslanie pliku index.html do przegladarki
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/hello', function (req, res) {
    res.send("Wywołałeś metode post z parametrem /hello!");
});
app.get('/tablica' , function(req , res) {
    res.sendFile(__dirname + '/public/canvas.html');
});
app.get('/testy' ,function(req , res){
    res.sendFile(__dirname + '/public/testy.html');
});
app.get('/karta' ,function(req , res){
    res.sendFile(__dirname + '/public/karta.html');
});
//Dynamiczny routing...
//po public/ moze byc tylko jedna liczba z zakresu 1-9
app.get('/:id([0-9]{1})', function (req, res) {
    res.send('the id you specified is' + req.params.id);
});

//routing z parametrami
app.get('/:name/:id', function (req, res) {
    res.send('Imie:' + req.params.name + ' and ID:' + req.params.id);
});

//nie znaleziono pasujacego linku
//TO MUSI BYĆ NA KONCU! odpala jak express nie znajdzie odpowiednieo routa!
app.get('*', function (req, res) {
    res.send('Przykro mi.Nie znaleziono żądanego elemntu...');
});



//server nasluchuje na porcie 3000 adres zdalny
//server.listen(3000 , "http://wsciek.ct8.pl/" );
//nasluch serwera na localhoscie
server.listen(3000, function () {
    console.log('Serwer nasłuchuje');
});
io.on('connection', function (socket) {
    socket.on('chat.message', function (wiadomosc) { 
        console.log(wiadomosc);
        io.emit('chat.message',wiadomosc);
        if(wiadomosc[1] == "1m1"){ 
        io.emit('info' , 'wykonało sie');
        }
    });
    socket.on('rzut' ,function(wynikRzutu){
        
        io.emit('rzut' , wynikRzutu);
        console.log(wynikRzutu);
    });

});