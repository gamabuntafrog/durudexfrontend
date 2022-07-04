import React, {useEffect, useState} from "react"
import styles from "./LoginBackground.module.scss";

type LoginBackgroundBackgroundProps = {
    username: string
}

const useWindowWidth = () => {
    const [width, setWidth] = useState<string>('medium');

    useEffect(() => {
        const handleWidth = () => {
            if (window.innerWidth > 1280) {
                setWidth('large')
            } else if (window.innerWidth > 768 && window.innerWidth < 1280) {
                setWidth('medium')
            } else if (window.innerWidth < 768) {
                setWidth('small')
            }
        }
        handleWidth()
        window.addEventListener('resize', handleWidth)
    }, []);

    return width
}

const LoginBackground = ({username = ''}: LoginBackgroundBackgroundProps) => {


    const width: string = useWindowWidth()


    let amountOfColumns

    if (width === 'small') {
        amountOfColumns = [1,2]
    } else if (width === 'medium') {
        amountOfColumns = [1,2,3,4]
    } else {
        amountOfColumns = [1,2,3,4,5,6]
    }

    username = `@${username}`

    return <>
        {amountOfColumns.map((_, index) => {
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