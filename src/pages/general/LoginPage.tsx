import { useState } from 'react';
import { useNavigate } from "react-router";
import { tryLogin, Response, simulateNetworkDelay } from '../../backend/server';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button'
import { BiLogIn } from "react-icons/bi";
import './LoginPage.css'

type LoginError = {
    emailError: boolean,
    passwordError: boolean,
    emailHelperText: string,
    passwordHelperText: string
}

const defaultLoginError:LoginError = {
    emailError: false,
    passwordError: false,
    emailHelperText: '',
    passwordHelperText: ''
}


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<LoginError>({...defaultLoginError});
    const navigate  = useNavigate();
    

    function onChangeEmailInput(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    }

    function onChangePasswordlInput(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }


    async function handleClickLoginButton(){
        const currentError:LoginError = {...defaultLoginError};

        if(email.length === 0){
            currentError.emailError = true;
            currentError.emailHelperText = 'Insira seu email';
        }
        else{
            currentError.emailError = false;
            currentError.emailHelperText = '';
        }
        if(password.length === 0){
            currentError.passwordError = true;
            currentError.passwordHelperText = 'Insira sua senha';
        }
        else{
            currentError.passwordError = false;
            currentError.passwordHelperText = '';
        }
        
        setErrors({...currentError});

        // se nao teve nenhum erro de input, tenta fazer o login
        if(!currentError.emailError && !currentError.passwordError){
            setIsLoading(true);

            await simulateNetworkDelay();
            tryLogin(email, password)
            .then((response)=>{
                if(response.status === 200){
                    navigate('/cliente/lista-processos')
                }
            })
            .catch((error)=>{
                setIsLoading(false);

                if(error.status === 401){
                    currentError.emailError = true;
                    currentError.emailHelperText = 'Credenciais incorretas';
                    currentError.passwordError = true;
                    currentError.passwordHelperText = 'Credenciais incorretas';
                    setErrors({...currentError});
                }
                else{
                    console.error(error)
                }
            })
        }
    }


    function handleKeyDown(e:React.KeyboardEvent){
        if(e.key === 'Enter'){
            handleClickLoginButton();
        }
    }


    return(
        <div className="login-page">
            <section className='login-page__left-section'>
                {/* <img className='left-section__logo' src="/logo.png" alt="Procuradoria Geral do Estado de Sergipe" /> */}
            </section>
            
            <section className='login-page__right-section'>
                {/* <img className='right-section__logo' src="/logo.png" alt="Procuradoria Geral do Estado de Sergipe" /> */}

                <div className='right-section__login-container' onKeyDown={handleKeyDown}>
                    <div>
                        <h1>Seja bem-vindo!</h1>
                        <h2>Digite suas credenciais nos campos abaixo:</h2>
                    </div>
                    <div>
                        <TextInput value={email} onChange={onChangeEmailInput} label='Email' fontSize='16px' disabled={isLoading} error={errors.emailError} helperText={errors.emailHelperText} />
                        <TextInput value={password} onChange={onChangePasswordlInput} label='Senha' fontSize='16px' secret disabled={isLoading} error={errors.passwordError} helperText={errors.passwordHelperText} />
                    </div>
                    <div className='login-container__buttons-container'>
                        <Button label='Entrar' onClick={handleClickLoginButton} loading={isLoading} variant='solid' rightIcon={BiLogIn} grow />
                        <p className='login-container__forgot-password'>Esqueci minha senha</p>
                    </div>
                </div>
            </section>
        </div>
    )
}