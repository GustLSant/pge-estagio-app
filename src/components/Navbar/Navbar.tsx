import { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router';
import { BiFile } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiArrowFromLeft } from "react-icons/bi";
import './Navbar.css'

type NavbarState = 'initialOpen' | 'open' | 'closed';


export default function Navbar(){
    const [state, setState] = useState<NavbarState>('initialOpen');
    const authContext = useContext(AuthContext);
    const currentUrl = useLocation().pathname;
    const navbarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();


    function handleOptionClick(option: 'process' | 'conta'){
        if(option === 'process'){ navigate('/cliente/lista-processos'); }
        else{ navigate('/minha-conta'); }
    }


    function handleClick(){
        if(state === 'closed'){ setState('open'); }
    }

    function handleMouseLeave(){
        if(state === 'initialOpen' || state === 'open'){ setState('closed'); }
    }

    function handleClickOutsideNavbar(event: MouseEvent){
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
          if(state === 'initialOpen'){ setState('closed'); }
        }
    };


    useEffect(() => {
        document.addEventListener('click', handleClickOutsideNavbar);
        
        return () => {
          document.removeEventListener('click', handleClickOutsideNavbar);
        };
    }, []);


    return(
        <div className={`navbar ${(state === 'initialOpen' || state === 'open') ? 'active' : 'disabled'}`} ref={navbarRef} onClick={handleClick} onMouseLeave={handleMouseLeave}>
            <div className='navbar-wrapper'>
                <section className='navbar__disabled-container'>
                    <img className='navbar__disabled-logo' src="/logo-alt-transp-small.png" alt="Logo PGE-SE" />
                    <BiArrowFromLeft />
                </section>

                <section className="navbar__header-container">
                    <img src="/logo-alt-transp-small.png" alt="Logo PGE-SE" />
                    <div>
                        <h2>PGE - SE</h2>
                        <small>
                            Procuradoria Geral <br />
                            do Estado de Sergipe
                        </small>
                    </div>
                </section>

                <section className="navbar__options-container">
                    <div className="navbar__spacer"></div>
                    <div className={`navbar__option ${(currentUrl.includes('lista-processos'))?'active':''}`} onClick={()=>{handleOptionClick('process')}}>
                        <BiFile />
                        <p>Processos</p>
                    </div>
                    <div className="navbar__spacer"></div>
                    <div className={`navbar__option ${(currentUrl.includes('minha-conta'))?'active':''}`} onClick={()=>{handleOptionClick('conta')}}>
                        <BiUserCircle />
                        <p>Minha Conta</p>
                    </div>
                    <div className="navbar__spacer"></div>
                </section>
                
                <div className="navbar__spacer"></div>
                
                <section className='navbar__footer'>
                    <BiUser />
                    <div>
                        <p>{authContext?.user?.shortName}</p>
                        <small>
                            {
                                (authContext?.user?.role === 'client') ? 'Cliente' :
                                (authContext?.user?.role === 'attorney') ? 'Procurador' : ''
                            }
                        </small>
                    </div>
                </section>
            </div>
        </div>
    )
}