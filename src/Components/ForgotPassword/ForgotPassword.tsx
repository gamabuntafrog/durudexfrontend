import React, {useState, useEffect, useRef, ChangeEvent, FC, useId} from "react"
import styles from './forgotPassword.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Modal from "../Modal";
import ForgotPasswordBackground from "./ForgotPasswordBackground/ForgotPasswordBackground";
import {useMutation} from "@apollo/client";
import {CREATE_VERIFY_EMAIL_CODE} from "../../query/user";
import ForgotPasswordStep3 from "./ForgotPasswordStep3";

type Input = {
    email: string,
};

export type userInputDataType = {
    email: string,
    code: string,
    newPassword: string,
}

enum resetPasswordSteps {
    emailForm = 1,
    verifyEmail = 2,
    passwordForm = 3
}

let regexForEmail = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

const ForgotPassword: FC = () => {

    const emailId = useId()

    const [tryCreateVerify, {data, loading, error}] = useMutation(CREATE_VERIFY_EMAIL_CODE, {
        onCompleted: ({createVerifyEmailCode}: {createVerifyEmailCode: boolean} ) => {
            if (createVerifyEmailCode) {
                setStep(resetPasswordSteps.verifyEmail)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [userInputData, setUserInputData] = useState<userInputDataType>({email: "", code: "", newPassword: ""});
    const [step, setStep] = useState<resetPasswordSteps>(resetPasswordSteps.emailForm);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Input>({mode: "onBlur"});

    const inputWrapper = useRef<HTMLDivElement | null>(null)
    const submitRef = useRef<HTMLButtonElement | null>(null)

    const onSubmitEmail: SubmitHandler<Input> = ({email}) => {
        tryCreateVerify({
            variables: {
                email: email
            }
        })
        setUserInputData(prev => {return {...prev, email: email}})
    }

    const inputAutofocus = (e: ChangeEvent<HTMLInputElement>) => {
        const id = Number(e.target.id)

        if (e.target.value.length >= 0) {
            if (id === 6) {
                submitRef.current?.focus()
            } else {
                document.getElementById(`${id + 1}`)!.focus()
            }
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
            //?????? ?????????????????? ?????? ?????????? ?? ?????????? ?????????????? ?? ?????????????????????????? ???? ?????????? ?? ?????? ???? ????????????
            if (isEmpty) {
                setIsCodeVerifyError(true)
            } else {
                setUserInputData(prev => {return {...prev, code: code}})
                setStep(resetPasswordSteps.passwordForm)
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
                        <h1 className={styles.forgotPassword__title}>???????????? ????????????</h1>
                        <form className={styles.email__form} onSubmit={handleSubmit(onSubmitEmail)}>
                            {errors.email ?
                                <label htmlFor={emailId} className={styles.fieldsAreRequired}>{errors.email.message}</label>
                                :
                                <label htmlFor={emailId}>Email</label>
                            }
                            <input id={emailId} className={errors.email ? styles.inputIfError : ''} placeholder={'Email'} type={'email'} {...register("email", {
                                pattern: {
                                    value: regexForEmail,
                                    message: '???????????????????????? ??????????'
                                },
                                required: '???????????????????????? ??????????'
                            })} />

                            <button className={styles.email__submit} type="submit" >
                                ????????????
                            </button>

                        </form>
                    </div>
                }
                 {step === 2 &&
                     <Modal>
                         <div className={styles.verifyEmail}>
                             <p>
                                 ?????? ?????????????????? ???????????????????????? ????????????????, ???????? ?????????? ?????????????????????? ???????? ???????????????????? ????????????.
                                 ?????????????? ?????? ??????????????, ???????????????????? ???? ???????? ???????????????????? ????????????, ?? ?????????? ?????????????????? ???????????? ??????????.
                             </p>

                             <div ref={inputWrapper} className={styles.verify__input__wrapper}>
                                 <input id={'1'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'2'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'3'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'4'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'5'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                                 <input id={'6'} onFocus={resetField} onChange={inputAutofocus} maxLength={1} type={'number'} min={0} className={isCodeVerifyError ? styles.verify__inputIfError : styles.verify__input}/>
                             </div>
                             <button ref={submitRef} className={styles.verify__submit} onClick={verifyCode} >
                                 ????????????????????
                             </button>
                         </div>
                     </Modal>
                 }
                {step === 3 && <ForgotPasswordStep3 userInputData={userInputData} setUserInputData={setUserInputData}/>}
	        </div>

        </div>
    )
}

export default ForgotPassword