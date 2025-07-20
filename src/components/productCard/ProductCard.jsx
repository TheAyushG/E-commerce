import React, { useContext, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {addToCart} from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import myContext from '../../context/data/MyContext'



// purpose, we store the product that is allready in the fireStore database and now we are add them in cart 
// and this thing we are storing in "cartItems"


//purpose of this code:
// This gives us access to the Redux dispatch function so that we can send actions to the Redux store.
// 👉 Why? Because we want to update the state (like adding items to the cart).


// const cartItems = useSelector((state) => state.cart)
// This reads the current cart state from Redux using the useSelector hook.

//Redux cart is our actual data where our all data is store
// {
//   cart: [
//     { id: 1, name: 'Shirt', price: 500 },
//     { id: 2, name: 'Shoes', price: 1000 }
//   ]
// }
// This cart data comes from your cartSlice using the initialState.
// The Redux store holds all global state.
// We use Redux Toolkit (cartSlice) to create and manage this part.
// We read it using useSelector, and update it using dispatch.

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product, searchkey, setSearchkey, filterType, setFilterType,
        filterPrice, setFilterPrice } = context        //we get product here from the firstore but this product come from the myContext

    const dispatch = useDispatch()     //used to send actions to Redux store.
    const cartItems = useSelector((state) => state.cart);  //useSelector reads the current cart from Redux.


    // const cartSlice = createSlice({
    //  name: 'cart',
    //  initialState,  // <--- THIS is what becomes state.cart
    //  reducers: { ... }
    // })
    // in This above "initialState" is what we accessing when we do state.cart. in the cartSlice.jsx

    
    //useSelector
    //It allows you to access any data from the Redux store.
    //It's like the entire object that holds everything in Redux.
    //Example of Redux state
    // {
    //  cart: [...items in cart...],
    //  user: {...user info...},
    //  theme: "dark"
    // }

        //Where does state come from? ,  It comes from our Redux store setup:   // reducer: {
                                                                                // cart: cartSlice
                                                                                // }
                                                                                // This creates a global state that looks like:
                                                                                // {
//So when we write:                                                             // cart: [...], so when we use "cart" word and storing cart here
//useSelector((state) => state.cart)                                            // }
//then we are accessing:                                                        // So when we write: 
//state.cart → which gives you the array of cart items from initialState.       // useSelector((state) => state.cart)
//initialState is that state in which we are storing the                        // we are saying:
                                                                                // “Give me the cart array from the Redux state.”

    // React-Redux hook that allows you to read data from the Redux store in any React component.  
    //useSelector data : Think of it like: “Hey Redux, I want to read this piece of data from your global state!”   
    //pulls the current cart state from Redux (e.g., an array of items added to the cart).

    console.log(cartItems);

    const addCart = (product) => {
        dispatch(addToCart(product)); //dispatch is a function provided by redux that is used to send an action to the reudx store
        toast.success('add to cart');
    }

    
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])


    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>


                <div className="flex flex-wrap -m-4">
                    {product.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice)).slice(0,8).map((item, index) => {
                        const { title, price, description, imageUrl, id } = item;
                      return(
                        <div onClick={() => window.location.href = `/productinfo/${id}`} key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                          <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                            
                            <div className="flex justify-center cursor-pointer" >
                                <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt="blog" />
                            </div>

                            <div className="p-5 border-t-2">
                                
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>NeuroMart</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}> {title} </h1>
                                {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {price}</p>
                               
                                <div className=" flex justify-center">
                                    <button onClick={() => addCart(item)} type="button" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>
                                </div>

                            </div>

                          </div>
                        </div>

                        )
                    })}

                    

                </div>

            </div>
        </section >

    )
}

export default ProductCard