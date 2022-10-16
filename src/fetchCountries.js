import {fetchCountries} from "./index.js"

const getInput = document.getElementById(`search-box`);

getInput.addEventListener(`input`, (event)=>{
    let getName = event.target.value
    console.log(getName);
    fetchCountries(getName);
    console.log(fetchCountries(getName));
    
})




