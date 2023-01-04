import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const userStorage = localStorage.getItem("users_db");

        if (userToken && userStorage) {
            const hasUser = JSON.parse(userStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            ); 

            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    const login = (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));
        const hasUser = usersStorage?.filter(
            (user) => user.email === email
        );

        if (hasUser?.length) {
            if (hasUser[0].email === email && hasUser[0].password === password) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({ email, token }));
                setUser({ email, password });
                return;
            } else {
                return "Email ou senha incorretos!"
            } 
        } else {
            return "Email ou senha incorretos!"
        }
    };

    const signup = (email, password, cel, nome) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));
        const hasUser = usersStorage?.filter(
            (user) => user.email === email
        );

        if (hasUser?.length) {
            return "já existe um usuário com este email!!"
        }

        let newUser;

        if (usersStorage) {
            newUser = [...usersStorage, { email, password, cel, nome }];
        } else {
            newUser = [{ email, password, cel, nome }];
        }

        localStorage.setItem("users_db", JSON.stringify(newUser));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, login, signup, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
        
}