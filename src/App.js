import { useEffect, useState } from 'react';
import './App.css';
import video from './food.mp4'
import MyRecipesComponent from './MyRecipesComponent';

function App() {
  const MY_ID = '5eb615b7';
  const MY_KEY = '3c7bf630d1436af5e7fb620550bad96c';

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState('avocado');


  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      setMyRecipes(data.hits)
    }
    getRecipe()
  }, [wordSubmitted])


  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
    setWordSubmitted(mySearch)
  } 

  const finalSearch = (e) => {
    e.prevent.default()
  }

  return (
  <div className="App">
    <div className="container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <h1>Find a Recipe</h1>
    </div>

    <div className='container'>
      <form onSubmit={finalSearch}>
        <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}/>
      </form>
    </div>

    <div className='container'>
      <button>
        <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
      </button>
    </div>

    {myRecipes.map((element, index) => (
      <MyRecipesComponent key={index}
        label={element.recipe.label}
        image={element.recipe.image}
        calories={element.recipe.calories}
        ingredients={element.recipe.ingredientLines} />
    ))}
  </div>
  );
}

export default App;