import './TextInput.css'

type TextInputProps = {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    secret?: boolean,
    fontSize?: string,
    helperText?: string,
    error?: boolean,
    disabled?: boolean,
}

const defaultOnChangeFunc = (e: React.ChangeEvent<HTMLInputElement>)=>{}

const defaultProps:TextInputProps = {
    value: '',
    onChange: defaultOnChangeFunc,
    label: 'Label',
    secret: false,
    fontSize: '16px',
    helperText: '',
    error: false,
    disabled: false,
}


export default function TextInput(_props:TextInputProps){
    const props:TextInputProps = {...defaultProps, ..._props};
    
    const errorClass = (props.error) ? 'error' : '';
    const disabledClass = (props.disabled) ? 'disabled' : '';
    const fullClass = 'text-input ' + errorClass + ' ' + disabledClass

    
    return(
        <div className={fullClass} style={{fontSize: props.fontSize}}>
            <p className='text-input__label'>{props.label}:</p>
            
            {
                props.secret
                ? 
                <input type="password" value={props.value} onChange={props.onChange} style={{fontSize: props.fontSize}} />
                :
                <input type="text" value={props.value} onChange={props.onChange} style={{fontSize: props.fontSize}} />
            }
            
            
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