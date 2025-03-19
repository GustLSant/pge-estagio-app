import { ReactNode } from "react";
import { BiX } from "react-icons/bi";
import './Modal.css'


type ModalProps = {
    children: ReactNode | undefined,
    handleCloseFunction: () => void,
}


export default function Modal({ handleCloseFunction, children }: ModalProps){

    return(
        <div className="modal">
            <div className="modal__exit-area" onClick={handleCloseFunction}></div>

            <div className="modal__content-container">
                <BiX onClick={handleCloseFunction} className="modal__close-button" />
                {children}
            </div>
        </div>
    )
}