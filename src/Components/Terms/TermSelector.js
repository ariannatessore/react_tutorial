import React from'react';
import { terms } from '../../Utilities/Utilities';
import { TermButton } from './TermButton';
import {signInWithGoogle} from '../../Utilities/firebase';
import { signOut } from 'firebase/auth'; 
import{useUserState} from '../../Utilities/firebase';



export const SignInButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signInWithGoogle()}>
      Sign In
    </button>
  );
  
  const SignOutButton = () => (
    <button className="btn btn-secondary btn-sm"
        onClick={() => signOut()}>
      Sign Out
    </button>
  );

 


  export const TermSelector = ({term, setTerm}) => {
    const [user] = useUserState();
    return (
      <div className="btn-toolbar justify-content-between">
        <div className="btn-group">
        { 
          Object.values(terms).map(
            value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
          )
        }
        </div>
        { user ? <SignOutButton /> : <SignInButton /> }
      </div>
    );
  };
  

 
