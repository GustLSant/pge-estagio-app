import { IconType } from 'react-icons';
import { BiLoaderAlt } from "react-icons/bi";
import './Button.css'

type ButtonProps = {
    label: string,
    onClick: () => void,
    variant?: 'solid' | 'outlined',
    colorVariant?: 'light' | 'dark',
    grow?: boolean,
    fontSize?: string,
    gap?: string,
    paddingVertical?: string,
    paddingHorizontal?: string,
    leftIcon?: IconType,
    rightIcon?: IconType,
    iconSize?: string,
    loading?: boolean,
    disabled?: boolean,
}

const defaultOnClickFunc = () => {};

const defaultProps:ButtonProps = {
    label: 'label',
    onClick: defaultOnClickFunc,
    variant: 'solid',
    colorVariant: 'dark',
    grow: false,
    fontSize: '1.15em',
    gap: '3px',
    paddingVertical: '0.5em',
    paddingHorizontal: '2.5em',
    leftIcon: undefined,
    rightIcon: undefined,
    iconSize: '1.35em',
    loading: false,
    disabled: false,
};


export default function Button(_props:ButtonProps){
    const props:ButtonProps = {...defaultProps, ..._props};

    const growClass = (props.grow) ? 'grow' : ''
    const loadingClass = (props.loading) ? 'loading' : '';
    const disabledClass = (props.disabled) ? 'disabled' : '';
    const fullClass = 'button shadow-01 ' + props.variant + ' ' + props.colorVariant + ' ' + growClass + ' ' + loadingClass + ' ' + disabledClass
    
    const style = {
        fontSize: props.fontSize,
        gap: props.gap,
        paddingTop: props.paddingVertical,
        paddingBottom: props.paddingVertical,
        paddingLeft: props.paddingHorizontal,
        paddingRight: props.paddingHorizontal
    }


    return(
        <button className={fullClass} style={style} onClick={props.onClick}>
            {
                props.loading
                ?
                <BiLoaderAlt className='button__loading-icon' style={{fontSize: props.iconSize}} />
                :
                <>
                    {props.leftIcon && <props.leftIcon style={{fontSize: props.iconSize}} />}
                    <p>{props.label}</p>
                    {props.rightIcon && <props.rightIcon style={{fontSize: props.iconSize}} />}
                </>
            }
        </button>
    )
}
