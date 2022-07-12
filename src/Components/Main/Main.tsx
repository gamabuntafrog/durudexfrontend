import React, {useState, useEffect, FC} from "react"
import '../../App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Navigate, Route, Routes} from 'react-router-dom';
import {useLazyQuery} from "@apollo/client";
import {Context} from "../../index";
import {GET_USER} from "../../query/user";
// import {tokens as importedTokens} from "./index";
import ForgotPassword from "../../Components/ForgotPassword";
import { userType } from '../../types/user';
import {tokensType} from "../../types/auth";
import Login from "../../Components/Login";
import Auth from "../../Components/Auth";
import Header from "../../Components/Header";
import User from "../../Components/User";
import Posts from "../../Components/Posts";
import Post from "../../Components/Post";
import Loader from "../../Components/Loader";
import styles from "./main.module.scss";

type MainPropsTypes = {
    tokens: tokensType | null,
    setTokens: React.Dispatch<React.SetStateAction<tokensType | null>>
}

const randomId = Math.floor(Math.random() * 1000)

const Main: FC<MainPropsTypes> = ({tokens, setTokens}) => {

    const storageTokens = localStorage.getItem('tokens');

    const [fetchUser, {data: userData, loading: userLoading, error: userError}] = useLazyQuery(GET_USER, {
        onCompleted: (userData: {me: userType}) => {
            setUser(userData.me)
            setIsLoading(false)
        },
        fetchPolicy: 'network-only'
    })

    const [user, setUser] = useState<userType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (storageTokens) {
            console.log(storageTokens)
            setTokens(JSON.parse(storageTokens))
            fetchUser()
        } else {
            setIsLoading(false)
        }
    }, []);

    if (user) {
        return (
            <Context.Provider value={{
                user,
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
                            <Route path={'user'} element={<User/>}/>
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
    } else {
        return (
            <Context.Provider value={{
                user,
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

export default Main