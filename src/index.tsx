import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink} from "@apollo/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Post from "./Components/Post";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Code from "./Components/Code";
import Auth from "./Components/Auth";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const randomId = Math.floor(Math.random() * 1000)

export type tokensType = {
    accessToken: String | null,
    refreshToken: String | null,
}

export type userType = {
    id: string | null,
    username: string | null,
    avatarUrl: string | null,
    createdAt: string | null,
    lastVisit: string | null,
    verified: boolean | null,
    isLoading: boolean
}

export interface IContext {
    tokens: tokensType | null,
    user: userType | null,
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    getTokens: (tokens: tokensType | null) => void,
    getUser: (data: userType | null) => void
}

export const Context = createContext<null | IContext>(null)

const httpLink = new HttpLink({ uri: 'https://api.dev.durudex.com/query' });

export const tokens = localStorage.getItem('tokens');
if (tokens) {
    console.log(JSON.parse(tokens))
}

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: tokens ?
            {
                Authorization: `Bearer ${JSON.parse(tokens).accessToken}`
            } : {}
    })
    return forward(operation)
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

root.render(

        <Provider store={store}>
            <ApolloProvider client={client}>


            <BrowserRouter>
                <App />

            </BrowserRouter>
            </ApolloProvider>

        </Provider>
);
