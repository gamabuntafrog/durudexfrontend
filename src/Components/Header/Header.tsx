import {useState, useEffect, FC, useId, useContext} from "react"
import {NavLink, useLocation, useMatch} from "react-router-dom";
import styles from "./header.module.scss"
import {Context} from "../../index";

const Header: FC = () => {

    const {user} = useContext(Context)!
    console.log(user)


    if (user) {
        return (
            <header className={styles.Header}>
                <nav>
                    <ul className={styles.nav__list}>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.nav__link__active : styles.nav__link
                                }
                                to={'/'}>
                                Головна
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.nav__link__active : styles.nav__link
                                }
                                to={`/post`}>
                                Пост
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.nav__link__active : styles.nav__link
                                }
                                to={'/user'}>
                                {user.username}
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </header>
        )
    } else {
        return (
            <header className={styles.Header}>
                <nav>
                    <ul className={styles.nav__list}>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.nav__link__active : styles.nav__link
                                }
                                to={'/'}>
                                Головна
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.nav__link__active : styles.nav__link
                                }
                                to={`/post`}>
                                Пост
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? styles.nav__link__active : styles.nav__link
                                }
                                to={'/login'}>
                                Увійти
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </header>
        )
    }

}

export default Header