import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useEffect, useMemo, useState} from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import {useLazyQuery} from "@apollo/client";
import {Context} from "./index";
import {GET_USER} from "./query/user";
import {tokens as importedTokens} from "./index";
import ForgotPassword from "./Components/ForgotPassword";
import { userType } from './types/user';
import {tokensType} from "./types/auth";
import Login from "./Components/Login";
import Auth from "./Components/Auth";
import Header from "./Components/Header";
import User from "./Components/User";
import Posts from "./Components/Posts";
import Post from "./Components/Post";
import Loader from "./Components/Loader";

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
    }, []);

    useEffect(() => {
        if (userData) {
            setUser(userData.me)
            setIsLoading(false)

        }

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
                    <main>
                    <Routes>
                        <Route path={'post/:id'} element={<Post/>} />
                        <Route path={'post'} element={<Navigate to={`/post/${randomId}`} replace />} />
                        <Route path={'login'} element={<Login/>}/>
                        <Route path={'auth'} element={<Auth/>}/>
                        <Route path={'forgotPassword'} element={<ForgotPassword/>}/>
                        <Route path={'/'} element={<Posts/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/post" replace />}
                        />
                    </Routes>
                    </main>

                </div>
                {isLoading && <Loader/>}
            </Context.Provider>

        );
    }


}

export default App;
