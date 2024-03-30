import React from 'react';
import './Modal.css';
import {apiURL} from "../../../constants.ts";

interface Props {
  image: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = (props) => {
    return (
        <>
            <div className="modal-overlay" onClick={props.onClose} />
            <div className="grey-bg">
                <div className="modal">
                    <img src={props.image ? apiURL + '/' + props.image : ''} alt="Photo" />
                    <button onClick={props.onClose}>X</button>
                </div>
            </div>
        </>
    );
};


export default Modal;
