
// here's where we select all the items we need to in the HTML
const getMealBtn = document.getElementById('get_meal');
const mealContainer = document.getElementById('meal');


// adding an event listener for the click event, so that we can fetch the info 
// from the database once it is clicked 
// it will return the meals array, but with only one item in it, so we have to pass it on index
// 0 into our next function
getMealBtn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
    createMeal(res.meals[0]);
  });
});


// this entire function's purpose is to get the JSON response, parse it, then transform it
// into an HTML component that looks fine on our browser
const createMeal = (meal) => {
  const ingredients = [];
  for(let i=1; i<=20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      break;
    };
  };
// we looped through the ingredients, 1-20 to check if the meal has the right ingredient-measure pair. 
// if it does, we're putting it into the ingredients array. If there are no more ingredients we stop 
// the loop with a "break"

// Below, we are creating the newInnerHTML string which is going to hold all of the HTML markup. 
// We are parsing the remaining properties that we want to be displayed on the page. 
  const newInnerHTML = `
    <div class="row">
      <div class="columns five">
        <img src="${meal.strMealThumb}" alt="Meal Image">
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h5>Ingredients:</h5>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')} 
        </ul>
      </div>
      <div class="columns seven">
        <h4>${meal.strMeal}</h4>
        <p>${meal.strInstructions}</p>
      </div>
    </div>
    ${meal.strYoutube ? `
    <div class="row">
      <h5>Video Recipe</h5>
      <div class="videoWrapper">
        <iframe width="420" height="315"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
      </div>
    </div>` : ''}
  `;
// some of the properties might not have been available, and if that is the case we use the
// ternary operator to check if we have the data to display the tag. If we don't have it then
// we return an empty string, aka nothing shows up on the page. Category and area are examples of 
// these properties. 
  mealContainer.innerHTML = newInnerHTML;
};


// function to fill the empty meals if there are none on the page load (there won't be any bc we don't save any)

function fillEmptyMeals() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
    createMeal(res.meals[0]);
  });
};      


// event listener that waits for the load, and if localStorage is empty (it always should be)
// then we fire the fillEmptyMeals function from above
window.addEventListener("load", function() { 
  console.log(localStorage.getItem("meals") === '[]');
  if(!localStorage.getItem("meals") || localStorage.getItem("meals") === '[]') {
    fillEmptyMeals()
  };  
});    
    
    
 



