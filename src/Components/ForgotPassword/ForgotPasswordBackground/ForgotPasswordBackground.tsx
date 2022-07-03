import React from "react"
import styles from "./forgotPasswordBackground.module.scss";

type ForgotPasswordBackgroundProps = {
    step: number
}

const ForgotPasswordBackground = ({step}: ForgotPasswordBackgroundProps) => {

    const backgroundLength = [1,2,3,4,5,6,7,8]

    return <>
        {backgroundLength.map((_, index) => {
        return <div key={index} className={styles.text}>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
            <h2 className={styles.step}>Крок <span>{step}</span></h2>
        </div>
    })}
    </>



}

export default ForgotPasswordBackground