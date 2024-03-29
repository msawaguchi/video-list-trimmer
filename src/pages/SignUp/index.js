import React, { useState }  from "react";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  useAuth from "../../hooks/useAuth";

import Input from "../../components/Input";
import Button  from "../../components/Button";

import * as C from "./styles";

const SignUp = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [cel, setCel] = useState();
    const [senha, setSenha] = useState();
    const [error, setError] = useState();
    const [senhaConfirmar, setSenhaConfirmar] = useState();

    const  handleSignup = async () => {
        const schema = Yup.object().shape({
            email: Yup.string()
              .required('O e-mail é obrigatório')
              .email('Insira um e-mail válido'),
          });

        if (senhaConfirmar !== senha) {
            toast.error("Confirme a senha com valores iguais!" , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
            return;
        }
    
        if (!email | !senha | !cel | !nome | !senhaConfirmar) {
            toast.error("Preencha todos os campos!" , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
            return;
        } 

        const checkEmail = await schema.isValid({ email}).then(result => {return result});

        if (!checkEmail) {
            toast.error("Preencha o e-mail corretamente!" , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
            return;
        }


        const res = signup(email, senha, cel, nome);

        if (res) {
            toast.error(res , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
            return;
        } else {
            toast.success("Cadastro feito com sucesso!" , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
        }

        navigate("/home");
    };

    return (
        <C.Container>
            <C.Label>Register a new account</C.Label>
            <C.Content>
                <Input
                    type="nome"
                    placeholder="Name"
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="text"
                    placeholder="Tel"
                    value={cel}
                    onChange={(e) => [setCel(e.target.value), setError("")]}
                    mask="(99) 99999-9999"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                 <Input
                    type="password"
                    placeholder="Confirm password"
                    value={senhaConfirmar}
                    onChange={(e) => [setSenhaConfirmar(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Sign up" onClick={handleSignup} />
                <C.LabelSignup>
                    Already have an account?
                    <C.Strong>
                        <Link to="/">&nbsp;Login</Link>
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
            <ToastContainer/>
        </C.Container>
    )
}

export default SignUp;