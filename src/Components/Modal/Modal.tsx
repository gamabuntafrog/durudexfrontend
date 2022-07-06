import {useState, useEffect, FC, ReactNode} from "react"
import styles from './modal.module.scss';

type ModalPropTypes = {
    children: ReactNode
}

const Modal: FC<ModalPropTypes> = ({children}) => {

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContainer}>
                {children}
            </div>
        </div>
    )
}

export default Modal