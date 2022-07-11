import {useState, useEffect, useContext, FC} from "react"
import styles from './user.module.scss'
import {Context} from "../../index";
import { Navigate, useNavigate } from "react-router-dom";
import {useMutation} from "@apollo/client";
import {LOGOUT} from "../../query/user";


const User: FC = () => {

    const {user, tokens, getUser, getTokens, isLoading, setIsLoading} = useContext(Context)!;
    const [logOut, {data, loading, error}] = useMutation(LOGOUT)

    const navigate = useNavigate()

    const tryLogOut = () => {


        logOut({
            variables: {
                token: tokens!.refreshToken
            }
        })
    }


    useEffect(() => {
        if (data && data.signOut) {

                setIsLoading(true)
                localStorage.removeItem('tokens')
                getUser(null)
                getTokens(null)
                navigate('/post')

        }
    }, [data]);


    if (user) {
        const {avatarUrl, createdAt, id, username, lastVisit, verified} = user


        return (
            <div className={styles.User}>
                <h2 className={styles.user__lastVisit}>Останній раз був онлайн: {lastVisit}</h2>
                <div className={styles.avatar}><h1>Avatar</h1></div>
                <div className={styles.user__container}>
                    <h1>{username}</h1>
                    <p><span>Id:</span> {id}</p>
                    <button className={styles.logOut} onClick={() => tryLogOut()}>Вийти з аккаунту</button>
                </div>
                <p className={styles.user__createdAt}><span>Створений:</span> {createdAt}</p>
            </div>
        )
    } else {
        return <Navigate to={'/login'} />
    }


}

export default User