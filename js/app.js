
// get input value 
const getInputValue = () => {
    const input = document.getElementById('search-field');
    const inputValue = input.value;
    loadData(inputValue);
    return inputValue
    
}
// input field add enter event 
document.getElementById('search-field').addEventListener("keypress", function onEvent(e) {
    if (e.key === "Enter") {
        getInputValue()
    }
});

// load data by search name 
const loadData = (text) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
    fetch(url)
    .then( res => res.json())
    .then(data => displayData(data.drinks))
    .catch(error => console.log(error))
}
// display data by search value 
const displayData = (datas) => {
    const mainDiv = document.getElementById('cocktail-section');
    mainDiv.innerHTML = '';
    const spiner = document.getElementById('spiner');
    if(datas.length === 0 ){
        spiner.classList.remove('d-none')
    }
    else{
        spiner.classList.add('d-none')
    }
    datas = datas.slice(0,16);
   datas.forEach(data => {
    const {strDrinkThumb, strDrink,strInstructions,idDrink} = data;
    const newDiv = document.createElement('div');
    newDiv.classList.add('col');
    newDiv.innerHTML= `
            <div class="card div-card">
            <img src="${strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${strDrink}</h5>
            <p class="card-text">${strInstructions.slice(0,100)}</p>
            <div class="text-center">
            <button onclick="loadMoreData(${idDrink})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Primary</button>
            </div>
            </div>
    `
    mainDiv.appendChild(newDiv)
   });
    
}
//  load data for more info by id 
const loadMoreData = async (id) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMoreData(data.drinks[0]))
}
// show data more by id in modal 
 const displayMoreData = (data) => {
    document.getElementById('cocktail-modal').innerText = data.strDrink;
    document.getElementById('ingredient').innerText = data.strIngredient1 + ', ' + data.strIngredient2 + ' ,' + data.strIngredient3
 }