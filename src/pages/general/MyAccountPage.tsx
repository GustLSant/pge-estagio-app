import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { User, Response } from "../../types";
import { formatDate } from "../../utils";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import TextInput from "../../components/TextInput/TextInput";
import { BiUserCircle } from "react-icons/bi";
import './MyAccountPage.css';
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import { tryChangePassword } from "../../backend/server";


export default function MyAccountPage(){
    const [userData, setUserData] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
    const authContext = useContext(AuthContext);

    // states do modal de trocar senha
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [wrongPassword, setWrongPassword] = useState<boolean>(false)
    const [differentPasswords, setDifferentPasswords] = useState<boolean>(false);

    // setters do modal de trocar senha
    function handleChangeCurrentPasswordInput(e:ChangeEvent<HTMLInputElement>){
        setCurrentPassword(e.target.value);
    }
    function handleChangeNewPasswordInput(e:ChangeEvent<HTMLInputElement>){
        setNewPassword(e.target.value);
    }
    function handleChangeConfirmNewPasswordInput(e:ChangeEvent<HTMLInputElement>){
        setConfirmNewPassword(e.target.value);
    }


    useEffect(()=>{
        setUserData(authContext?.user);
        setIsLoading(false);
    }, [authContext])


    function handleClickChangePassword(){
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setWrongPassword(false);
        setDifferentPasswords(false);
        setIsChangingPassword(true);
    }


    function handleClickConfirmChangePassword(){
        if(newPassword === confirmNewPassword){
            setDifferentPasswords(false);
            if(authContext?.user){
                tryChangePassword(authContext.user, currentPassword, newPassword)
                .then((response: Response)=>{
                    console.log(response);
                    setIsChangingPassword(false);
                })
                .catch((error: Response)=>{
                    if(error.status === 401){ setWrongPassword(true); }
                    console.error(error);
                })
            }
        }
        else{
            setDifferentPasswords(true);
        }
    }


    return(
        <div className="my-account-page">
            <header className="my-account-page__header">
                <BiUserCircle />
                <h2>Minha Conta</h2>
            </header>

            {
                isChangingPassword
                &&
                <Modal handleCloseFunction={()=>{setIsChangingPassword(false);}}>
                    <h3>Alterar Senha</h3>

                    <div className="my-acount-page__inputs-password-container">
                        <TextInput label="Senha atual" value={currentPassword} onChange={handleChangeCurrentPasswordInput} secret error={wrongPassword} helperText={(wrongPassword) ? 'Senha incorreta' : ''} />
                        <TextInput label="Nova senha" value={newPassword} onChange={handleChangeNewPasswordInput} secret error={differentPasswords} />
                        <TextInput label="Confirmar nova senha" value={confirmNewPassword} onChange={handleChangeConfirmNewPasswordInput} secret error={differentPasswords} helperText={differentPasswords ? 'As duas senhas não coincidem' : ''} />
                    </div>

                    <div className="my-acount-page__modal-button-password-container">
                        <Button label="Alterar Senha" fontSize="0.9em" onClick={handleClickConfirmChangePassword} />
                    </div>
                </Modal>
            }
            

            {
                (isLoading) ? <LoadingIcon />
                :
                (!userData) ? <p>Algo deu errador, por favor recarregue a página.</p>
                :
                <>
                    <section className="my-account-page__infos-container">
                        {
                            <>
                            <div className="row-separator"></div>

                            <div className="my-account-page__info">
                                <p>Nome completo:</p>
                                <p>{userData.fullName}</p>
                            </div>

                            <div className="row-separator"></div>

                            <div className="my-account-page__info">
                                <p>CPF:</p>
                                <p>{userData.cpf}</p>
                            </div>

                            {
                                (userData.oab) &&
                                <>
                                    <div className="row-separator"></div>
                                    <div className="my-account-page__info">
                                        <p>OAB:</p>
                                        <p>{(userData.oab)}</p>
                                    </div>
                                </>
                            }

                            <div className="row-separator"></div>

                            <div className="my-account-page__info">
                                <p>Tipo de conta:</p>
                                <p>{(userData.role === 'client') ? 'Cliente' : 'Procurador'}</p>
                            </div>

                            <div className="row-separator"></div>

                            <div className="my-account-page__info">
                                <p>Email:</p>
                                <p>{userData.email}</p>
                            </div>

                            <div className="row-separator"></div>

                            <div className="my-account-page__info">
                                <p>Data de cadastro:</p>
                                <p>{formatDate(userData.registerDate)}</p>
                            </div>

                            <div className="row-separator"></div>
                            </>
                        }
                    </section>

                    <section className="my-account-page__buttons-container">
                        <Button label="Alterar Senha" onClick={handleClickChangePassword} fontSize="0.9em" />
                    </section>
                </>
            }


        </div>
    )
}