import React from "react"
import styles from "./LoginBackground.module.scss";

type LoginBackgroundBackgroundProps = {
    username: string
}

const LoginBackground = ({username = ''}: LoginBackgroundBackgroundProps) => {

    username = `@${username}`

    const backgroundLength = [1,2,3,4,5,6,]

    return <>
        {backgroundLength.map((_, index) => {
            return  <div key={index} className={styles.text}>
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
    </>


}

export default LoginBackground