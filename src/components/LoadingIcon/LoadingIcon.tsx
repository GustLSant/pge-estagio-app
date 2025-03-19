import { BiLoaderAlt } from "react-icons/bi";
import './LoadingIcon.css';


type LoadingIconsProps = {
    label?: string,
    hasLabel?: boolean,
    fontSize?: string,
    iconSize?: string,
}

const defaultProps:LoadingIconsProps = {
    label: 'Carregando...',
    hasLabel: true,
    fontSize: '1em',
    iconSize: '1em',
}


export default function LoadingIcon(_props: LoadingIconsProps){
    const props = {...defaultProps, _props};

    return(
        <div className="loading-icon">
            <BiLoaderAlt style={{fontSize: props.iconSize}} className="rotating-element" />
            {(props.hasLabel && <p style={{fontSize: props.fontSize}}>{props.label}</p>)}
        </div>
    )
}