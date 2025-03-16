import { useState } from "react"
import './TextInput.css'

type TextInputProps = {
    label: string,
    isSecrect?: boolean,
    fontSize?: string,
    helperText?: string,
    error?: boolean,
    disabled?: boolean,
}

const defaultProps:TextInputProps = {
    label: 'Label',
    isSecrect: false,
    fontSize: '16px',
    helperText: '',
    error: false,
    disabled: false,
}


export default function TextInput(_props:TextInputProps){
    const props:TextInputProps = {...defaultProps, ..._props};
    const [text, setText] = useState('');
    const errorClass = (props.error) ? 'error' : '';
    const disabledClass = (props.disabled) ? 'disabled' : '';

    return(
        <div className={`text-input ${errorClass} ${disabledClass}`} style={{fontSize: props.fontSize}}>
            <p className='text-input__label'>{props.label}:</p>
            
            <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}} style={{fontSize: props.fontSize}} />
            
            {
                props.helperText &&
                <p className="text-input__helper-text">{props.helperText}</p>
            }
        </div>
    )
}





/* <div className="text-input__animated-label-container">
    <p className={`text-input__animated-label ${(text.length > 0)?'active':''}`}>{props.label}</p>
</div> */