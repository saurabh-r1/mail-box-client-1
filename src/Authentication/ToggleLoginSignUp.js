import { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';
import { Button } from 'react-bootstrap';

const ToggleLoginSignUp = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);

    const toggle = () => {
        setIsLoginPage(!isLoginPage);
      };
  return (
    <div>
        <div>
            { isLoginPage &&
                <Login />
            }
            { !isLoginPage &&
                <SignUp />
            }
        
        
        </div>
        <div className="button2">
            <Button onClick={toggle}>
              {isLoginPage
                ? "New User? Create Account"
                : "Login with Existing Account"}
            </Button>
          </div>
    </div>
  )
}

export default ToggleLoginSignUp;