import React, {useContext, useEffect, useMemo, useState} from 'react';
import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useLazyQuery} from "@apollo/client";
import Post from "./Components/Post";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import Login from "./Components/Login";
import Code from "./Components/Code";
import Auth from "./Components/Auth";
import Header from "./Components/Header";
import User from "./Components/User";
import Posts from "./Components/Posts";
import {Context, tokensType, userType} from "./index";
import {GET_USER} from "./query/user";
import {tokens as importedTokens} from "./index";
import {Bars} from "react-loader-spinner";
import Loader from "./Components/Loader";
import ForgotPassword from "./Components/ForgotPassword";

function App() {

    const randomId = Math.floor(Math.random() * 1000)
    const [fetchUser, {data: userData, loading: userLoading, error: userError}] = useLazyQuery(GET_USER)

    const [user, setUser] = useState<userType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tokens, setTokens] = useState<tokensType | null>(null);

    useEffect(() => {

        if (importedTokens) {
            setTokens(JSON.parse(importedTokens))
            fetchUser()
        } else {
            setIsLoading(false)

        }
        console.log(tokens)

        console.log(user)
    }, []);

    useEffect(() => {


        if (userData) {
            setUser(userData.me)
            setIsLoading(false)

        }

        console.log(userData)
    }, [userData]);


    const memoUser = useMemo(() => (user), [user])

    if (user) {
        return (
            <Context.Provider value={{
                user: memoUser,
                tokens,
                isLoading,
                setIsLoading,
                getTokens: (tokens) => {
                    setTokens(tokens)
                },
                getUser: (data) => {
                    setUser(data)
                }
            }}>

                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path={'post/:id'} element={<Post/>} />
                        <Route path={'post'} element={<Navigate to={`/post/${randomId}`} replace />} />
                        <Route path={'user'} element={<User/>}/>
                        <Route path={'/'} element={<Posts/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/post" replace />}
                        />
                    </Routes>
                </div>
                {isLoading && <Loader/>}
            </Context.Provider>

        );
    } else {
        return (
            <Context.Provider value={{
                user: memoUser,
                tokens,
                isLoading,
                setIsLoading,
                getTokens: (tokens) => {
                    setTokens(tokens)
                },
                getUser: (data) => {
                    setUser(data)
                }
            }}>

                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path={'post/:id'} element={<Post/>} />
                        <Route path={'post'} element={<Navigate to={`/post/${randomId}`} replace />} />
                        <Route path={'login'} element={<Login/>}/>
                        <Route path={'code'} element={<Code/>}/>
                        <Route path={'auth'} element={<Auth/>}/>
                        <Route path={'forgotPassword'} element={<ForgotPassword/>}/>
                        <Route path={'/'} element={<Posts/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/post" replace />}
                        />
                    </Routes>
                </div>
                {isLoading && <Loader/>}
            </Context.Provider>

        );
    }


}

export default App;
