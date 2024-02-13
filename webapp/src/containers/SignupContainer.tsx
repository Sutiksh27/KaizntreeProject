import Signup from '../pages/Signup'
import apiHelper from '../utilities/ApiHelper'

const SignupContainer = () => {
  const handleSignup = async (username: string, email: string, password: string) => {
     console.log('Signing up with: ', username, email);
     const user = {
        username: username,
        email: email,
        password: password
     }
     const signup = await apiHelper.createUser(user);
     console.log("Signup: ", signup);

  }
  return (
    <>
      <Signup onSignup={handleSignup}/>
    </>
  )
}

export default SignupContainer