import {useState, useEffect} from "react"
import styles from './modal.module.scss';

const Modal = ({children}: any) => {

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                {children}
            </div>
        </div>
    )
}

export default Modal