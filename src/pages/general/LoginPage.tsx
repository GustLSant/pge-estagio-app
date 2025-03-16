import { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button'
import { BiLogIn } from "react-icons/bi";
import './LoginPage.css'


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    function onChangeEmailInput(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    }

    function onChangePasswordlInput(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }



    return(
        <div className="login-page">
            <section className='login-page__left-section'>
                {/* <img className='left-section__logo' src="/logo.png" alt="Procuradoria Geral do Estado de Sergipe" /> */}
            </section>

            <section className='login-page__right-section'>
                {/* <img className='right-section__logo' src="/logo.png" alt="Procuradoria Geral do Estado de Sergipe" /> */}

                <div className='right-section__login-container'>
                    <div>
                        <h1>Seja bem-vindo!</h1>
                        <h2>Digite suas credenciais nos campos abaixo:</h2>
                    </div>
                    <div>
                        <TextInput value={email} onChange={onChangeEmailInput} label='Email' fontSize='16px'  />
                        <TextInput value={password} onChange={onChangePasswordlInput} label='Senha' fontSize='16px' secret />
                    </div>
                    <div className='login-container__buttons-container'>
                        <Button label='Entrar' variant='solid' rightIcon={BiLogIn} grow />
                        <p className='login-container__forgot-password'>Esqueci minha senha</p>
                    </div>
                </div>
            </section>
        </div>
    )
}