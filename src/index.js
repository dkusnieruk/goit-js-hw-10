import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 500;

const getInput = document.getElementById("search-box");
const getList = document.querySelector(`ul`);
const getIndex =document.querySelector(`li`);
const getCountryInfo=document.getElementsByClassName("country-info");
let countries;

let num;
function formatNumberToK(num) {
    if (num >= 1000000000)
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';

    if (num >= 1000000)
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';

    if (num >= 1000)
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';

    return num;
}


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
     <div><b>Population :</b> ${formatNumberToK(countries[0].population)}</div>
     <div><b>Languages:</b> ${(countries[0].languages).map((lang)=>{
        return lang.name;
     })}</div>
     `
    
}
getList.innerHTML =options;
 
};
    
const debounceValue = debounce (fetchCountries,DEBOUNCE_DELAY);

getInput.addEventListener(`input`, (event)=>{    
const currentInput=event.target.value;   
debounceValue(currentInput.trim(""));
debounceClick();
});
let single;
function clickElement(){
    let single = document.querySelectorAll(`li`);
    for (let e=0; e<single.length; e++){
        single[e].addEventListener(`click`,(event)=>{
            Notiflix.Report.info(`${countries[e].name}`, `
                                                          Population: ${formatNumberToK(countries[e].population)}
                                                          Capital: ${countries[e].capital}
                                                          Languages: ${(countries[e].languages).map((lang)=>{
                                                            return lang.name
                                                          })}                                        
        `, 'Close',{
            titleFontSize: '40px',
            messageFontSize: `28px`,
            backOverlay:true,
            
            svgSize: `0px`,
        });
        console.log(countries[e]);  
        
        })
    }
}
const debounceClick = debounce(clickElement,1000)


    module.exports = {
        fetchCountries:fetchCountries
    }
