import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { Description } from '@headlessui/react';
import { Timestamp } from 'firebase/firestore/lite';
import { toast } from 'react-toastify';

const MyState = (props) => {
      const [mode, setMode] = useState('light');

      const toggleMode = () => {
        if(mode === 'light') {
          setMode('dark');
          document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }

        else{
          setMode('light');
          document.body.style.backgroundColor = "white";
        }
      }
    


  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
          title: null,
          price: null,
          imageUrl: null,
          category: null,
          description: null,
          time: Timestamp.now(),
          date: new Date().toLocaleString(
            "en-US",
            {
          month: "short",
          day: "2-digit",
          year: "numeric",
          }
        )
  })




  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || 
       products.description == null) {
      return toast.error('all fields are required')
    }

    setLoading(true)

    try {                                                   //fireDB  conencts our app to the firestore database
      const productRef = collection(fireDB, 'products');    //actual meaning, Go to the 'products' collection in the Firebase database. //fireDB is firebase database object  //"products" is the collection name in our firebase   
      await addDoc(productRef, products);                   //products is the actual data we want to store. 
      toast.success("add product successfully");
      getProductData();
      setLoading(false)                                     //products is the data and we are storing it in productRef, productRef is the reference of database where we are stirng actrual data    
      

    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }





  const [product, setProduct] = useState([]);

  const getProductData = async () =>  {
      setLoading(true);

      try{
        const q = query(
          collection(fireDB, 'products'),
          orderBy('time')
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let productArray = [];
          QuerySnapshot.forEach((doc) => {
            productArray.push({...doc.data(), id: doc.id});
          });
          setProduct(productArray);
          setLoading(false)
        });

        return () => data;
      }
      catch (error){
        console.log(error)
        setLoading(false)
      }
  }





  useEffect(() => {
    getProductData();
  },[]);

    
  return (
    <MyContext.Provider value={{mode, toggleMode, loading, setLoading, 
    products, setProducts, addProduct, product}}>
        {props.children}
    </MyContext.Provider>  
  )
}

export default MyState