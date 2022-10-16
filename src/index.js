import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const getInput = document.getElementById("search-box");
const getList = document.querySelector(`ul`);
const getCountryInfo=document.getElementsByClassName("country-info");
let countries;
function fetchCountries(name){

    fetch (`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    

    .then(response =>{

    return response.json();
     
    })
    .then((data)=>{
        
        initialize(data);
    })
    .catch((error)=>{
        console.log("Error: " + error)
    })
    
    
    };

function initialize(countriesData){
    countries=countriesData;
    console.log(countries);
    let options="";
    if (countries.length>100){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.',{
            width:"250px",
        })

    } else if (countries.length<10 && countries.length>2) {
    for( let i =0; i < countries.length; i++){
        options += `<li>
        <p><img src="${countries[i].flags.svg}"</p>
        <p>${countries[i].name}</p>
        </li>`
    }
    getList.innerHTML = options;
   
} else {
     options += `
     <p><img src="${countries[0].flags.svg}"</p>
     <p>${countries[0].name}</p>
     <div>Capital : ${countries[0].population} </div>
     <div>Population : ${countries[0].capital}</div>
     <div>Languages: ${countries[0].languages.name}</div>
     </li>`
    
}
getList.innerHTML =options;
 };
    
getInput.addEventListener(`input`, (event)=>{
  
fetchCountries(event.target.value);
})


    
    module.exports = {
        fetchCountries:fetchCountries
    }
