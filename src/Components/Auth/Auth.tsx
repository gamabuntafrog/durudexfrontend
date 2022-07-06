import {useState, useEffect} from "react"
import styles from "./auth.module.scss";
import logo from '../../images/logo.png'
import {NavLink} from "react-router-dom";
const Auth = () => {



    return (
        <div className={styles.Auth}>
            <div className={styles.container}>
                <img src={logo}/>
                <NavLink to={'/register'}>
                    Зареєструватись
                </NavLink>
                <NavLink to={'/login'}>
                    Увійти
                </NavLink>
            </div>
        </div>
    )
}

export default Auth