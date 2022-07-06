import React, {useState, useEffect, FC} from "react"
import styles from "./forgotPassword.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {CHANGE_PASSWORD} from "../../query/user";
import { userInputDataType } from "./ForgotPassword";
import {useNavigate} from "react-router-dom";

type PasswordInputs = {
    passwordOne: string,
    passwordTwo: string
}

type ForgotPasswordStep3PropTypes = {
    userInputData: userInputDataType,
    setUserInputData: React.Dispatch<React.SetStateAction<userInputDataType>>
}

const ForgotPasswordStep3: FC<ForgotPasswordStep3PropTypes> = ({userInputData, setUserInputData}) => {

    const [tryChangePassword, {data: passwordData, loading: passwordLoading, error: passwordError}] = useMutation(CHANGE_PASSWORD)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordInputs>();

    const navigate = useNavigate();

    const onSubmitPassword: SubmitHandler<PasswordInputs> = ({passwordOne, passwordTwo}) => {
        console.log(passwordOne);

        if (passwordOne === passwordTwo) {
            setUserInputData(prev => {return {...prev, newPassword: passwordOne}})
            tryChangePassword({
                variables: {
                    email: userInputData.email,
                    code: userInputData.code,
                    password: passwordOne
                }
            })
            navigate('/auth')
        }

    }

    useEffect(() => {
        console.log(passwordData)
    }, [passwordData])

    const isPasswordEqual = watch('passwordOne') === watch('passwordTwo')
    const classNameLabelOnVerify = !isPasswordEqual ? styles.fieldsAreRequired : errors.passwordOne ? styles.fieldsAreRequired : ''
    const classNamePasswordInputOnVerify = !isPasswordEqual ? styles.inputIfError : errors.passwordOne ? styles.inputIfError : ''

    return (
        <div className={styles.leftAside}>
            <h1 className={styles.forgotPassword__title}>Змінити пароль</h1>
            <form className={styles.password__form} onSubmit={handleSubmit(onSubmitPassword)}>
                <label className={classNameLabelOnVerify}>Password</label>
                <input className={classNamePasswordInputOnVerify} placeholder={'Password'} type={'password'} {...register("passwordOne",
                    {
                        required: 'Поле обовязкове для заповнення',
                        minLength: 8
                    })} />
                <label className={classNameLabelOnVerify}>Return password</label>
                <input className={classNamePasswordInputOnVerify} placeholder={'Return password'} type={'password'} {...register("passwordTwo", {
                    required: 'Поле обовязкове для заповнення',
                    minLength: 8
                })} />
                {!isPasswordEqual ?
                    <span className={styles.fieldsAreRequired}>Паролі не співпадають</span> :
                    (errors.passwordOne || errors.passwordTwo) ?
                        <span className={styles.fieldsAreRequired}>Мінімальна довжина 8 символів</span>: ''
                }

                <button className={styles.password__submit} type="submit" >
                    Змінити пароль
                </button>

            </form>
        </div>
    )
}

export default ForgotPasswordStep3