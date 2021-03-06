import styles from './login.module.scss'
import {useForm, SubmitHandler} from "react-hook-form";
import React, {useEffect, useContext, FC} from "react"
import {NavLink, useNavigate} from "react-router-dom";
import {GET_USER, LOGIN} from '../../query/user'
import {useLazyQuery, useMutation} from '@apollo/client';
import {Context} from "../../index";
import LoginBackground from "./LoginBackground";
import {userType} from "../../types/user";

type Inputs = {
    username: string,
    password: string,
};

let regexForEmail = new RegExp('^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$')

// зробити щоб можна було обійтисб без overflow
// щоб якщо екран гіно можна було скролити 

const Login: FC = () => {
    const {getUser, getTokens} = useContext(Context)!

    const [fetchUser, {data: userData, loading: userLoading, error: userError}] = useLazyQuery(GET_USER, {
        onCompleted: (userData: { me: userType }) => {
            getUser(userData.me)
            navigate('/', {replace: true})
        },
        fetchPolicy: 'network-only'
    })

    const [tryLogin, {data, loading, error}] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const {access, refresh} = data.signIn
            const tokens = {
                accessToken: access,
                refreshToken: refresh
            }
            getTokens(tokens)

            localStorage.setItem('tokens', JSON.stringify(tokens))
            fetchUser()
        }
    });

    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();

    const isUsernameInputEmpty: boolean = watch('username') === ''
    const isValidUsername = isUsernameInputEmpty ? true : regexForEmail.test(watch('username'))

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = ({username, password}) => {
        if (isValidUsername) {
            tryLogin({
                variables: {
                    username: username,
                    password: password
                },

            })
        }
    };

    const classNameOnVerify = !isValidUsername ? styles.inputIfError : errors.username ? styles.inputIfError : ''

    return (
        <section className={styles.Login}>
            <LoginBackground username={watch('username')}/>
            <div className={styles.container}>
                <div className={styles.aside}>

                </div>
                <div className={styles.login__container}>
                    <h1>Ласкаво просимо</h1>
                    <p>Увійти</p>

                    <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
                        {errors.username?.message ?
                            <label className={styles.fieldsAreRequired}>{errors.username?.message}</label> :
                            !isValidUsername ?
                                <label className={styles.fieldsAreRequired}>Нік містить недопустимі символи</label> :
                                <label>Username</label>
                        }
                        <input className={classNameOnVerify} placeholder={'Username'} {...register("username", {
                            required: 'Це поле обовязкове до заповнення',
                            minLength: {value: 8, message: 'Занадто короткий нік'}
                        })}
                        />

                        {errors.password?.message ?
                            <label className={styles.fieldsAreRequired}>{errors.password?.message}</label> :
                            <label>Password</label>
                        }
                        <input className={errors.password && styles.inputIfError}
                               placeholder={'Password'} {...register("password", {
                            required: 'Це поле обовязкове до заповнення',
                            minLength: {value: 8, message: 'Занадто короткий пароль'}
                        })}
                               type={'password'}
                        />

                        <NavLink className={styles.forgotPasswordLink} to={'/forgotPassword'}>
                            Забули пароль?
                        </NavLink>

                        <button className={styles.login__submit} type="submit">
                            Увійти
                        </button>
                        <NavLink className={styles.dontHave__account} to={'/'}>
                            Немає аккаунту?
                        </NavLink>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login