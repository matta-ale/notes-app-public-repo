import styles from "./Login.module.css";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {validation} from './validation'
import logo from '../../assets/img/logo.png'
import axios from 'axios'
import { useDispatch} from 'react-redux';
import { login } from '../../redux/actions';

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData,setUserData] = useState({username:'',password:''})
  const [errors,setErrors] = useState({username:'',password:''})
  // eslint-disable-next-line no-unused-vars
  const [access, setAccess] = useState(false);
  const {VITE_BACKEND_URL} = import.meta.env

  const handleLogin = async (userData) => {
    try {
      const { username, password } = userData;
      const body = {username,password}
      const URL = VITE_BACKEND_URL + '/users/login';
      const { data } = await axios.post(URL,body);
      const { access,id } = data;
      dispatch(login({userId:id,username:username}))
      localStorage.setItem('userData', JSON.stringify({userId:id,username:username}));
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
        window.alert(error.response.data.error);
    }
  };

  const handleChange = (event) => {
    const property = event.target.name
    setUserData({...userData,[property]:event.target.value})
    setErrors(validation({...userData,[property]:event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(userData)
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()
    navigate('/register')
  }

  return (
  <div className={styles.formContainer}> 
    <div className={styles.formDiv}>
      <div className={styles.titleContainer}>
        <div className={styles.loginAndRegister}>
          <h1>Please login</h1>
          <div className={styles.register}>
            <h3>or</h3>
            <button onClick={handleRegisterClick}>register</button>
          </div>
        </div>
        <img className={styles.loginImg} src={logo} alt="Login" />
      </div>
      <form className = {styles.form} onSubmit={handleSubmit}>
        <label htmlFor="">Username: </label>
        <input className={styles.input} type="text" name="username" placeholder='Type your username...' onChange={handleChange} value={userData.username}/>
        <p className={styles.warning}>{errors.username}</p>
        <br />
        <label htmlFor="">Password: </label>
        <input className={styles.input} type="password" name="password" placeholder='Type your password...' onChange={handleChange} value={userData.password}/>
        <p className={styles.warning}>{errors.password}</p>
        <br />
        <button className={styles.submitButton} type='submit'>Submit</button>
      </form>
    </div>
  </div>
  );
}
