 
  const api_url = 'http://localhost:3001';
  const api_url_specials = 'http://localhost:3001/specials';

  getRecipes();


    async function getRecipes(){
      const response = await fetch(`${api_url}/recipes`);
      const data = await response.json();
      const img = data[0].images.full
      console.log(data.length);

      data.map((el) => {
        addRecipes(el)
      })

    }
  

//Adding Container for every recipe
const list_view_container = document.querySelector('.list_view');
const addRecipes = (el) => {

  const recipes_list = document.createElement("li");
  const recipes_img_s = document.createElement("img");
  const recipes_capt = document.createElement("div");
  const recipes_title = document.createElement("h4");
  const recipes_desc = document.createElement("p");

  list_view_container.appendChild(recipes_list).classList.add('recipes_list');
  recipes_list.appendChild(recipes_img_s).classList.add('recipes_img_s');
  recipes_list.appendChild(recipes_capt).classList.add('recipes_capt');
  recipes_capt.appendChild(recipes_title).classList.add('recipes_title');
  recipes_capt.appendChild(recipes_desc).classList.add('recipes_desc');

  recipes_img_s.src = api_url + el.images.small;
  recipes_title.innerText = el.title;
  recipes_desc.innerText = el.description;

  //Click Recipe
  const NoRecipe = document.getElementById('NoRecipe');
  recipes_list.onclick = () => {
    const view_recipe_header = document.querySelectorAll('.process_header');
     view_recipe_header.forEach(element => {
         element.style.visibility = "visible";
    });
    NoRecipe.style.display = "none";
    viewRecipe(el);
  }

}


//View Recipe
const viewRecipe = (el) => {
  const view_recipe_title = document.querySelector('.view_recipe_title');
  const view_recipe_img = document.querySelector('.view_recipe_img');
  const view_recipe_desc = document.querySelector('.view_recipe_desc');

  //Time Prep
  const cont_hidden = document.querySelector(".cont_time")
  
  cont_hidden.style.visibility = "visible";

  const serv_time = document.querySelector('.serving_time');
  const cook_time = document.querySelector('.cook_time');
  const prep_time = document.querySelector('.prep_time');

  serv_time.innerText = el.servings  
  prep_time.innerText = el.prepTime + 'min'
  cook_time.innerText = el.cookTime + 'min' 

  view_recipe_title.innerText = el.title;
  view_recipe_img.src = api_url + el.images.medium;
  view_recipe_desc.innerText = el.description;

  const ingredients_cont = document.querySelector('.ingredients');
  ingredients_cont.innerHTML = '';

  fetch(api_url_specials)
    .then(response => {
      return response.json();
    })
    .then( data => {

    el.ingredients.map((ing) => {
      const ingredient_list = document.createElement("li");
      const ingredient_name = document.createElement("p");

      ingredient_list.appendChild(ingredient_name).classList.add('.ingredient_name');
      ingredients_cont.appendChild(ingredient_list).classList.add('.ingredient_list');

      ingredient_name.innerText = ing.name;
    
      data.map((spec) => {
        if(spec.ingredientId === ing.uuid){
          const specials_title = document.createElement('p');
          const specials_type = document.createElement('p');
          const specials_text = document.createElement('p');

          ingredient_name.appendChild(specials_title).classList.add('.specials_title');
          ingredient_name.appendChild(specials_type).classList.add('.specials_type');
          ingredient_name.appendChild(specials_text).classList.add('.specials_text');
          
          specials_title.innerText = spec.title;
          specials_type.innerText = spec.type;
          specials_text.innerText = spec.text;

          specials = [specials_title,specials_type,specials_text]
          specials.forEach(el => {
            el.style.fontSize = "11px";
            el.style.color = "gray";

          })
          
        }
      })
  });
});

  const procedure_cont = document.querySelector('.procedure');
  procedure_cont.innerHTML = '';
  el.directions.map((dir) => {
    const procedure_list = document.createElement("li");
    const procedure_text = document.createElement("p");

    procedure_list.appendChild(procedure_text).classList.add('.procedure_text');
    procedure_cont.appendChild(procedure_list).classList.add('.procedure_list');

    procedure_text.innerText = dir.instructions;
  })

}
