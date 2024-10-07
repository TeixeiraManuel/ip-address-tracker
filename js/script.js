let getMap = document.querySelector('#map')
var map;
var iconUrl
map = L.map(getMap).setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var myIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize: [38, 95],

});
L.marker([51.505, -0.09], {icon: myIcon}).addTo(map);