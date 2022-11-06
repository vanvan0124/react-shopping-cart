import React, { useEffect, useState } from 'react'
import ProductItem from './PerProductItem/ProductItem'
import style from './AllProducts.module.css'


const AllProducts = () => {
const [mealsLoading, setMealsLoading] = useState(true)  

const [products, setProducts] = useState([]);
useEffect(() => {

    const fetchProducts = async () => {
     const response = await  fetch('https://react-db-eed03-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');
     const responseData = await response.json()

     const loadedProducts = []
     for (const key in responseData) {
        loadedProducts.push({
            id: key,
            name : responseData[key].name,
            price : responseData[key].price
        })
     }
     setProducts(loadedProducts)
     setMealsLoading(false)
    }

    fetchProducts()  
}, [])

const productList = products.map((product) => <ProductItem 
    id={product.id}
    key={product.id} 
    name={product.name}
    price ={product.price}
    />  )

if(mealsLoading) {
  return (
          <section className={style.loadingMeals}>
            <p>Loading...</p>
          </section>
  )
}

return (
    <section className={style.container}>
        {productList} 
    </section>
       
    
        
    
  )
}

export default AllProducts