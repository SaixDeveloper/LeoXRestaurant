import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';



const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [drinks,setDrinks] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
 const [httpError,setHttpError] = useState();
 const [diffError,setDiffError] = useState();
  useEffect(() => {
    const fetchMeals =async () => {
      const response = await fetch('https://react-custom-b0eec-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      if(!response.ok)
      {
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for(const key in responseData)
      {
        loadedMeals.push({
          id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
        
      };
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
      setDiffError(1);
    })
  },[])
  useEffect(() => {
  const fetchDrinks = async () => {
    const response = await fetch('https://react-custom-b0eec-default-rtdb.asia-southeast1.firebasedatabase.app/drinks/.json');
    if(!response.ok)
    {
      throw new Error('Check here');
    }
    const responseData = await response.json();
    const loadedDrinks = [];
    for(const key in responseData)
    {
      loadedDrinks.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price,
        }
      )
    }
    setDrinks(loadedDrinks);
    setIsLoading(false);
  }
  fetchDrinks().catch((error)=>{
    setIsLoading(false);
    setHttpError(error.message);
    setDiffError(2);
  })
},[])
  
if(isLoading)
{
  return (
    <section className={classes.Loading}>
      <h2>Loading...</h2>
    </section>
  )
}
if(httpError)
{
  if(diffError == 1)
  {
    return (
      <section className={classes.HttpError}>
        <h2>Something Went Wrong! Meals</h2>
      </section>
    )
  }
  else if(diffError == 2)
  {
    return (
      <section className={classes.HttpError}>
        <h2>Something Went Wrong! Drinks</h2>
      </section>
    )
  }
}
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
const drinksList = drinks.map((drink) => (
<MealItem
key={drink.id}
id={drink.id}
name={drink.name}
description={drink.description}
price={drink.price}
/>
))
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        <ul>{drinksList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
