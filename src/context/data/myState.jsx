import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
;

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
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800);
      getProductData();
      setLoading(false)                                     //products is the data and we are storing it in productRef, productRef is the reference of database where we are stirng actrual data    
      
    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }





  const [product, setProduct] = useState([]);

  const getProductData = async () =>  {   //To fetch all the products in real-time from the Firestore database and store them in the product state.
      setLoading(true);

      try{
        const q = query(
          collection(fireDB, 'products'),
          orderBy('time')
        );

        //Every time something is added/updated/deleted in Firestore, onSnapshot gives updated data immediately.

        const data = onSnapshot(q, (QuerySnapshot) => {   //Think of QuerySnapshot as: A list of all documents from the Firestore query.   //onSnapshot gives us real-time updates from Firestore whenever data changes.
          let productArray = [];             // when data changes in Firestore, Then Firebase gives us the latest data inside QuerySnapshot, 
                                             // so the QuesrySnapshot contain data, that chaged in firestore and that change we store in quesrySnapshot now
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



  //update product function
  const edithandle = (item) => {  //we calling hat one item indide the object     //when we call edithandle(item), then this item is one product object brcomes
    setProducts(item)    //using setproducts we are save this item in products state, like this we have a product,
  }                                    //inside this products now we have items like objects like this check in just below line              //Saves that product into state
  //                                      products = [
  //                                       { id: 1, name: "Item 1", ... },   //Each element inside is an object representing one product.
  //                                       { id: 2, name: "Item 2", ... }
  //                                     ]                                                   
  //we are fetching data from firedatabase and store them in a array, inside the array we arrange them as object,
  //so we can easily access them by id, name, price etc. and we can easily
  //After fetching	[ {obj1}, {obj2}, ... ] (array of objects)
  
//After calling edithandle(item):
//products.id works ✅
//Because products is now just one object, not an array anymore.



  const updateProduct = async () => {
    setLoading(true)
    try {                //here are tow arguments, where to save doc and what to save
      await setDoc(doc(fireDB, "products", products.id), products) //here products is second argument, and it is product object
      toast.success("Product update successfully")
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800)
      getProductData();    
      setLoading(false)

    } catch (error) {
        console.log(error)
        setLoading(false)    
    }
  }


  //delete product function
  const deleteProduct = async (item) => {
       setLoading(true)
       try {
         await deleteDoc (doc(fireDB, "products", item.id))
         toast.success('product Deleted successfully');
         getProductData()
         setLoading(false)
       } catch (error) {
          console.log(error)
          setLoading(false)
       }
  }


const [order, setOrder] = useState([]);

const getOrderData = async () => {
  setLoading(true);
  try{
    const result = await getDocs(collection(fireDB, "order"))
    const ordersArray = [];
    result.forEach((doc) => {
      ordersArray.push(doc.data());
      setLoading(false)
    });
    setOrder(ordersArray);
    console.log(ordersArray);
    setLoading(false);
  }
  catch(error) {
    console.log(error)
    setLoading(false)
  }
}



const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }



useEffect(() => {
  getOrderData();
  getUserData();
},[]);


const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
    
  
  return (
    <MyContext.Provider value={{
        mode, toggleMode, loading, setLoading, 
        products, setProducts, addProduct, product,
        edithandle, updateProduct, deleteProduct,order,
        user, searchkey, setSearchkey, filterType, setFilterType,
        filterPrice, setFilterPrice
        }}>

        {props.children}
    </MyContext.Provider>  
  )
}

export default MyState