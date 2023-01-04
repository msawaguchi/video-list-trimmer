import React, { useState }  from "react";
import { Link, useNavigate } from "react-router-dom";
import  useAuth  from "../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import Input from "../../components/Input";
import Button  from "../../components/Button";

import * as C from "./styles";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [error, setError] = useState();

    const handleLogin = () => {
        if (!email | !senha) {
            toast.error("Preencha todos os campos!" , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
            return;
        }

        const res = login(email, senha);

        if (res) {
            toast.error(res , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
            return;
        }

        navigate("/home");
    };

    return (
        <C.Container>
            <C.Label>Entrar</C.Label>
            <C.Content>
                <Input
                    type="email"
                    placeholder="Digite o e-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="password"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Entrar" onClick={handleLogin} />
                <C.LabelSignup>
                    Ainda não tem uma conta?
                    <C.Strong>
                        <Link to="/signup">&nbsp;Cadastre-se aqui</Link>
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
            <ToastContainer/>
        </C.Container>
    )
}

export default Login;