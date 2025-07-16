import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/MyContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const context = useContext(myContext);
    const {loading, setLoading} = context;

    const signup = async () => {
        setLoading(true);
        if(name === "" || email ==="" || password === "") {
            return toast.error("All fields are required")
        }

        else if(password.length < 6) {
   return toast.error("Password must be at least 6 characters");
}

        try{    //createUserWithEmailAndPassword it is a method in firebase     it Creates a new user using email and password.      Automatically stores it in Firebase Authentication.
           const users = await createUserWithEmailAndPassword(auth, email, password)   //using this line we are create email and password and store them in firebase auth
           console.log(users)
           
           const user = {
                            //we need to store other data like name, uid  in firestore database, so we are creating this object, this data store in firestore database
            name: name,
            uid: users.user.uid,    //uid came from const users
            email: users.user.email,  //email is also came from const users
            time : Timestamp.now()
           }
            
           const userRef = collection(fireDB, "users")  //collection import from firestore
           await addDoc(userRef, user);           //using addDoc we are storing data in firestore, addDoc is import from firestore
           //addDoc() is a Firebase function      Takes a collection reference (like userRef)    Takes a data object (like user)        And creates a new document with that data
           toast.success("Signup successfully")
           setName('');
           setEmail('');
           setPassword('');
           setLoading(false)
          
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

   
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
        
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>

                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>

                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                

                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={signup}
                        className=' bg-red-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>


                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>login</Link></h2>
                </div>

            </div>
        </div>
    )
}

export default Signup