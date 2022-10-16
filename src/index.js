import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const getInput = document.getElementById("search-box");
const getList = document.querySelector(`ul`);
const getIndex =document.querySelector(`li`);
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
        Notiflix.Notify.warning(
            "Oops, there is no country with that name",
            {
            width:`300px`,
            useFontAwesome: true,
            warning: {
                background: `red`,
                textColor:`white`,
            }
            },
          )
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

    } else if (countries.length<10 && countries.length>1) {
    for( let i =0; i < countries.length; i++){
        options += `<li>
        <p><img src="${countries[i].flags.svg}"</p>
        <p>${countries[i].name}</p>
        </li>`
    }
    getList.innerHTML = options;
   
} else {
     options += `
     <div class ="header">
     <p><img class="image" src="${countries[0].flags.svg}"</p>
     <h3 class="country">${countries[0].name}</h3>
     </div>
     <div><b>Capital :</b> ${countries[0].capital} </div>
     <div><b>Population :</b> ${countries[0].population}</div>
     <div><b>Languages:</b> ${(countries[0].languages).map((lang)=>{
        return lang.name;
     })}</div>
     </li>`
    
}
getList.innerHTML =options;
 };
    
const debounceValue = debounce (fetchCountries,DEBOUNCE_DELAY);

getInput.addEventListener(`input`, (event)=>{    
const currentInput=event.target.value;   
debounceValue(currentInput.trim(""));
})



    
    module.exports = {
        fetchCountries:fetchCountries
    }
