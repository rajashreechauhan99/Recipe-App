const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipecontainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');



//function to get recipes
//await-> jabh tak data nahi milta tabh tak wait krta/proceed nahi krta aur ekdam mein sara data lakar deta hein
const fetchRecipes=async(query)=>{
    recipecontainer.innerHTML ="<h2>Fetching recipes...</h2>";
    try {
        
    
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    //data variable mein ek promise agaya hoga to use json mein convert hoga hume using .json
    const response=await data.json();


    //we are removing "search for your recipes" text
    recipecontainer.innerHTML ="";

    //response ek array de raha hei to uspe apn loop laga denge
    response.meals.forEach(meal => {
        // console.log(meal)
        const recipeDiv=document.createElement('div');//with the help of createElement('div') we are able to create a div in HTML 
        recipeDiv.classList.add("recipe");//with the help of classList and add we can assign a class to the element
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button=document.createElement('Button');
        button.style.color="#fff";
        button.textContent= "View Recipe";
        recipeDiv.appendChild(button);

        //adding eventListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopUp(meal);
        })

        recipecontainer.appendChild(recipeDiv);
    }); 
    // console.log(response.meals[0]);
} catch (error) {

        recipecontainer.innerHTML=`<img src="404.png" alt=""">`;
        // recipecontainer.innerHTML=`<h2>Error in fetching recipes</h2>`;
}

}

const openRecipePopUp =(meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions: </h3>
            <p >${meal.strInstructions}</p>
        </div>
    `
    
    recipeDetailsContent.parentElement.style.display ="block";
}

//function to fetch ingredients and measurements
const fetchIngredients=(meal)=>{
    console.log(meal);
    let ingredientsList ="";
    for(let i=1;i<=20;i++){
        const ingredient =meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();//autosubmit hone se rok dega , pg refresh nahi hoga
    e.stopPropagation();
    const searchInput= searchBox.value.trim();//trim() sare leading spaces remove kr deta hein
    // we wrote this code because if 
    if(!searchInput){
        recipecontainer.innerHTML=`
        <h2>Type the recipe you want to search</h2>
        `;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("It is working")
});

