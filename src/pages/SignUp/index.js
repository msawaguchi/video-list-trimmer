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

    const  handleSignup = async () => {
        const schema = Yup.object().shape({
            email: Yup.string()
              .required('O e-mail é obrigatório')
              .email('Insira um e-mail válido'),
            senha: Yup.string().min(
              6,
              'Sua senha deve possuir no mínimo 6 dígitos',
            ),
          });
    
        if (!email | !senha | !cel | !nome) {
            toast.error("Preencha todos os campos!" , {
                position: toast.POSITION.BOTTOM_RIGHT, 
                theme: "colored",});
            return;
        } 

        const checkEmail = await schema.isValid({ email, senha }).then(result => {return result});

        if (!checkEmail) {
            toast.error("Preencha os campos corretamente!" , {
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
            <C.Label>Cadastrar uma nova conta</C.Label>
            <C.Content>
                <Input
                    type="nome"
                    placeholder="Digite o nome"
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError("")]}
                />
                <Input
                    type="email"
                    placeholder="Digite o e-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="text"
                    placeholder="Celular"
                    value={cel}
                    onChange={(e) => [setCel(e.target.value), setError("")]}
                    mask="(99) 99999-9999"
                />
                <Input
                    type="password"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button Text="Cadastrar" onClick={handleSignup} />
                <C.LabelSignup>
                    Já tem uma conta?
                    <C.Strong>
                        <Link to="/">&nbsp;Entre aqui</Link>
                    </C.Strong>
                </C.LabelSignup>
            </C.Content>
            <ToastContainer/>
        </C.Container>
    )
}

export default SignUp;