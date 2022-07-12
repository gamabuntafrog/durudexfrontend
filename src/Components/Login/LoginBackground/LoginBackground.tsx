import React, {FC} from "react"
import styles from "./LoginBackground.module.scss";
import {screenTypes, useGetTypeOfScreen} from "../../../hooks/useGetTypeOfScreen";

type LoginBackgroundBackgroundProps = {
    username: string
}

const LoginBackground: FC<LoginBackgroundBackgroundProps> = ({username = ''}) => {

    const screen: screenTypes = useGetTypeOfScreen()

    let amountOfColumns: number[]

    switch (screen) {
        case screenTypes.largeType:
            amountOfColumns = [1, 2, 3, 4, 5,]
            break
        case screenTypes.mediumType:
            amountOfColumns = [1, 2, 3, 4]
            break
        case screenTypes.smallType:
            amountOfColumns = []
            break
        default:
            amountOfColumns = [1, 2, 3, 4]
            break
    }

    username = `@${username}`

    return <div className={styles.loginBackgroundWrapper}>
        {amountOfColumns.map((_, index) => {
            return <div key={index} className={styles.text}>
                <h2>Welcome {username}</h2>
                <h2>{username}</h2>
                <h2>Welcome {username}</h2>
                <h2>{username}</h2>
                <h2>Welcome {username}</h2>
                <h2>{username}</h2>
                <h2>Welcome {username}</h2>
                <h2>{username}</h2>
                <h2>Welcome {username}</h2>
                <h2>{username}</h2>
                <h2>Welcome {username}</h2>
            </div>
        })}
    </div>

}

export default LoginBackground