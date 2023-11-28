import styles from "./Register.module.css";
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {validation} from './validation'
import logo from '../../assets/img/logo.png'
import axios from 'axios'
import { login } from '../../redux/actions';

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userData,setUserData] = useState({username:'',password:'',repeatPassword:''})
  const [errors,setErrors] = useState({username:'',password:'',repeatPassword:''})

  const handleChange = (event) => {
    const property = event.target.name
    setUserData({...userData,[property]:event.target.value})
    setErrors(validation({...userData,[property]:event.target.value}))
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    const {data} = await axios.post('/users',{username:userData.username, password: userData.password})
    dispatch(login({userId:data.id,username:data.username}))
    localStorage.setItem('userData', JSON.stringify({userId: data.id,username:data.username}));
    navigate('/home');
  }

  return (
  <div className={styles.formContainer}> 
    <div className={styles.formDiv}>
      <div className={styles.titleContainer}>
        <h1>Please register</h1>
        <img className={styles.loginImg} src={logo} alt="logo" />
      </div>
      <form className = {styles.form} onSubmit={handleSubmit}>
      <label htmlFor="">Username: </label>
        <input className={styles.input} type="text" name="username" placeholder='Type your username...' onChange={handleChange} value={userData.username}/>
        <p className={styles.warning}>{errors.username}</p>
        <label htmlFor="">Password: </label>
        <input className={styles.input} type="password" name="password" placeholder='Type your password...' onChange={handleChange} value={userData.password}/>
        <p className={styles.warning}>{errors.password}</p>
        <label htmlFor="">Repeat password: </label>
        <input className={styles.input} type="password" name="repeatPassword" placeholder='Repeat your password...' onChange={handleChange} value={userData.repeatPassword}/>
        <p className={styles.warning}>{errors.repeatPassword}</p>
        <br />
        <button className={styles.submitButton} type='submit'>Register</button>
      </form>
    </div>
  </div>
  );
}
