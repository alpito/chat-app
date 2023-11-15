import {auth, provider} from '../firebase-config';
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";


import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const Auth = (props) => {
    const {setIsAuth} = props;


    const signIn = async () =>{

        try{
        const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken);
        setIsAuth(true);
        }
        catch(error){
            console.error(error);
        }

    }

    return (
        <div className="container">
          <h1 className='sign-in-text'>Sign in</h1>
          <button onClick={signIn} className='sign-in-button'>Sign in with Google</button>
        </div>
      );
      
}

