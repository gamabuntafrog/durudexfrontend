import {useState, useEffect} from "react"
import styles from './code.module.scss'
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string,
};



const Code = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);



    return (
        <div className={styles.Code}>
            <h1 className={styles.code__title}>Введіть Email та отримайте код на свою поштову скриньку</h1>
            <form className={styles.code__form} onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} placeholder={'Email'} type={'text'}/>
                <button>Отримати код на Email</button>
            </form>

        </div>
    )
}

export default Code