import React, {FC} from "react"
import styles from "./forgotPasswordBackground.module.scss";
import {screenTypes, useGetTypeOfScreen} from "../../../hooks/useGetTypeOfScreen";

type ForgotPasswordBackgroundProps = {
    step: number
}

const ForgotPasswordBackground: FC<ForgotPasswordBackgroundProps> = ({step}) => {


    const screen: screenTypes = useGetTypeOfScreen()

    let backgroundLength: number[]

    switch (screen) {
        case screenTypes.largeType:
            backgroundLength = [1, 2, 3, 4, 5, 6]
            break
        case screenTypes.mediumType:
            backgroundLength = [1, 2, 3, 4]
            break
        case screenTypes.smallType:
            backgroundLength = [1,2]
            break
        default:
            backgroundLength = [1, 2, 3, 4]
            break
    }

    return <div className={styles.forgotPasswordBackgroundWrapper}>
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

        </div>
    })}
    </div>



}

export default ForgotPasswordBackground