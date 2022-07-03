import React, {useState, useEffect, useRef, ChangeEvent} from "react"
import styles from './forgotPassword.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import Modal from "../Modal";
import ForgotPasswordBackground from "./ForgotPasswordBackground/ForgotPasswordBackground";
import {useMutation} from "@apollo/client";
import {CHANGE_PASSWORD, CREATE_VERIFY_EMAIL_CODE} from "../../query/user";

type Inputs = {
    email: string,
};

type PasswordInputs = {
    passwordOne: string,
    passwordTwo: string
}

let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const ForgotPassword = () => {

    const [tryCreateVerify, {data, loading, error}] = useMutation(CREATE_VERIFY_EMAIL_CODE)
    const [tryChangePassword, {data: passwordData, loading: passwordLoading, error: passwordError}] = useMutation(CHANGE_PASSWORD)

    const [userInputData, setUserInputData] = useState({email: "", code: "", newPassword: ""});
    const [step, setStep] = useState(1);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const isEmailValidate = regex.test(watch('email'))
    const navigate = useNavigate();

    const inputWrapper = useRef<HTMLDivElement | null>(null)!


    const onSubmitEmail: SubmitHandler<Inputs | any> = (data) => {
        // console.log(data);
        const email = data.email
        if (regex.test(watch('email'))) {
            tryCreateVerify({
                variables: {
                    email: data.email
                }
            })
            setUserInputData(prev => {return {...prev, email: email}})
            setStep(2)
        }

    }
    const onSubmitPassword: SubmitHandler<PasswordInputs | any> = (data) => {
        console.log(data);
        console.log(errors)
        console.log(userInputData)
        const passwordOne = data.passwordOne

        if (watch('passwordOne') === watch('passwordTwo')) {
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


    const classNameEmailInputOnVerify = !isEmailValidate ? styles.inputIfError : errors.email ? styles.inputIfError : ''
    const isPasswordEqual = watch('passwordOne') === watch('passwordTwo')
    const classNameLabelOnVerify = !isPasswordEqual ? styles.fieldsAreRequired : errors.passwordOne ? styles.fieldsAreRequired : ''
    const classNamePasswordInputOnVerify = !isPasswordEqual ? styles.inputIfError : errors.passwordOne ? styles.inputIfError : ''




    const inputAutofocus = (e: ChangeEvent<HTMLInputElement>) => {
        const id = Number(e.target.id)

        // console.log(inputWrapper.current?.childNodes[0].textContent)

        if (id === 7) {
            return
        }
        if (e.target.value.length >= 0) {
            document.getElementById(`${id + 1}`)!.focus()
        }
    }

    const resetField = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = ''
    }

    const [isCodeVerifyError, setIsCodeVerifyError] = useState(false);

    const verifyCode = () => {

        if (inputWrapper.current?.children) {
            let code = ''
            let isEmpty = false

            inputWrapper.current.childNodes.forEach((input: any) => {
                if (input.value.trim().length === 0) {
                    isEmpty = true
                }
                code = `${code}${input.value}`


            })
            if (isEmpty) {
                setIsCodeVerifyError(true)
            } else {
                setUserInputData(prev => {return {...prev, code: code}})
                setStep(3)
            }


        }
    }

    return (
         <div className={styles.ForgotPassword}>
            <ForgotPasswordBackground step={step}/>

             <div className={styles.container}>
		        <div className={styles.rightAside}/>

                {step === 1 &&
                    <div className={styles.leftAside}>
                        <h1 className={styles.forgotPassword__title}>Забули пароль</h1>
                        <form className={styles.email__form} onSubmit={handleSubmit(onSubmitEmail)}>
                            {isEmailValidate ?
                                <label>Email</label> :
                                <span className={styles.fieldsAreRequired}>Неправильний email</span>}
                            <input className={classNameEmailInputOnVerify} placeholder={'Email'} type={'email'} {...register("email")} />

                            <button className={styles.email__submit} type="submit" >
                                Увійти
                            </button>

                        </form>
                    </div>
                }

                {step === 3 &&
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
                }
	        </div>
             {step === 2 &&
		         <Modal>
			         <div className={styles.verifyEmail}>
				         <p>
					         Щоб завершити налаштування аккаунту, будь ласка підтвердіть свою електронну адресу.
					         Введіть код безпеки, надісланий на вашу електронну адресу, а потім натисніть кнопку нижче.
				         </p>

                             <div ref={inputWrapper} className={styles.verify__input__wrapper}>
                                 <input id={'1'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'2'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'3'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'4'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'5'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'6'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                             </div>
                             <button id={'7'} className={styles.verify__submit} onClick={verifyCode} >
                                 Перевірити
                             </button>
			         </div>
		         </Modal>
             }
        </div>
    )
}

export default ForgotPassword