import React, {useState, useEffect} from "react"
import {Bars} from "react-loader-spinner";
import Modal from "../Modal";

const Loader = () => {
    return (
        <Modal>
            <Bars color="#00BFFF" height={250} width={250} />
        </Modal>
    )
}

export default Loader