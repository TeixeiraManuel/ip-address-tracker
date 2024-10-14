let getMap = document.querySelector('#map')
let searchValue = document.querySelector('#search')
let btnSearch = document.querySelector('.btn')
let addressDetails = document.querySelectorAll('.address-details')
let marker;
var map;

initialRequest()

async function initialRequest(){

  try {
    const response = await fetch ("http://ip-api.com/json/");
    const data = await response.json();
    const {lat, lon} = data

    modalInformation(data.query, data.city, data.timezone, data.isp)

    map = L.map(getMap).setView([lat, lon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  
  // Cria um novo marcador
    marker = L.marker([lat, lon])
      .addTo(map)
  } catch (error) {
    alert('Erro ao obter os dados')
  }
}

btnSearch.addEventListener('click',()=>{
  if(!searchValue.value){
    alert('digite alguma coisa')
  }else{
    getLocation(searchValue.value)
  }
})

async function getLocation(value) {

  try {
    const response = await fetch(`https://ip-api.com/json/${value}`);
    const data = await response.json();
    const {lat, lon} = data;
    
    modalInformation(data.query, data.city, data.timezone, data.isp)
    createMarker(lat, lon)
  } catch (error) {
      console.log('Erro ao Obter os dados:', error.message);
      alert('tente novamente')
  }
}

function createMarker(lat, lon){
  if (marker) {
    map.removeLayer(marker);
}

// Cria um novo marcador
  marker = L.marker([lat, lon])
    .addTo(map)
    .bindPopup('Você está em')
    .openPopup();
  map.setView([lat, lon], 13);
}

function modalInformation(ip,city,timeZone,isp){
  addressDetails[0].textContent = ip || 'Indisponível';
  addressDetails[1].textContent = city || 'Indisponível';
  addressDetails[2].textContent = timeZone || 'Indisponível';
  addressDetails[3].textContent = isp || 'Indisponível';
}