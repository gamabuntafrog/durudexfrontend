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

    const [tryChangePassword, {data, loading, error}] = useMutation(CHANGE_PASSWORD,{
        onCompleted: ({forgotPassword}: {forgotPassword: boolean}) => {
            if (forgotPassword) {
                navigate('/auth')
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordInputs>({mode: "onBlur"});

    const navigate = useNavigate();

    const onSubmitPassword: SubmitHandler<PasswordInputs> = ({passwordOne, passwordTwo}) => {
        if (passwordOne === passwordTwo) {
            setUserInputData(prev => {return {...prev, newPassword: passwordOne}})
            tryChangePassword({
                variables: {
                    email: userInputData.email,
                    code: userInputData.code,
                    password: passwordOne
                }
            })
        }

    }

    const isPasswordEqual = watch('passwordOne') === watch('passwordTwo')
    const classNameLabelOnVerify = !isPasswordEqual ? styles.fieldsAreRequired : (errors.passwordOne || errors.passwordTwo) ? styles.fieldsAreRequired : ''
    const classNamePasswordInputOnVerify = !isPasswordEqual ? styles.inputIfError : (errors.passwordOne || errors.passwordTwo) ? styles.inputIfError : ''

    return (
        <div className={styles.leftAside}>
            <h1 className={styles.forgotPassword__title}>Змінити пароль</h1>
            <form className={styles.password__form} onSubmit={handleSubmit(onSubmitPassword)}>
                <label className={classNameLabelOnVerify}>Password</label>
                <input className={classNamePasswordInputOnVerify} placeholder={'Password'} type={'password'} {...register("passwordOne",
                    {
                        required: true,
                        minLength: 8
                    })} />
                <label className={classNameLabelOnVerify}>Return password</label>
                <input className={classNamePasswordInputOnVerify} placeholder={'Return password'} type={'password'} {...register("passwordTwo", {
                    required: true,
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