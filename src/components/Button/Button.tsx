import { IconType } from 'react-icons';
import './Button.css'

type ButtonProps = {
    label: string,
    variant?: 'solid' | 'outlined',
    color?: 'light' | 'dark',
    grow?: boolean,
    fontSize?: string,
    gap?: string,
    paddingVertical?: string,
    paddingHorizontal?: string,
    leftIcon?: IconType,
    rightIcon?: IconType,
    iconSize?: string,
}

const defaultProps:ButtonProps = {
    label: 'label',
    variant: 'solid',
    color: 'dark',
    grow: false,
    fontSize: '1.15em',
    gap: '3px',
    paddingVertical: '0.5em',
    paddingHorizontal: '2.5em',
    leftIcon: undefined,
    rightIcon: undefined,
    iconSize: '1.35em',
};


export default function Button(_props:ButtonProps){
    const props:ButtonProps = { /* fiz assim pois o Button.defaultProps nao estava funcionando */
        ...defaultProps,
        ..._props
    };
    
    const style = {
        fontSize: props.fontSize,
        gap: props.gap,
        paddingTop: props.paddingVertical,
        paddingBottom: props.paddingVertical,
        paddingLeft: props.paddingHorizontal,
        paddingRight: props.paddingHorizontal
    }


    return(
        <button className={`button shadow-01 ${props.variant} ${props.color} ${(props.grow)?'grow':''}`} style={style}>
            {props.leftIcon && <props.leftIcon style={{fontSize: props.iconSize}} />}
            <p>{props.label}</p>
            {props.rightIcon && <props.rightIcon style={{fontSize: props.iconSize}} />}
        </button>
    )
}
