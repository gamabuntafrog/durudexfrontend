import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";
import {IContext} from "./types/context";

export const Context = createContext<null | IContext>(null)

const httpLink = new HttpLink({ uri: 'https://api.dev.durudex.com/query' });

export const tokens = localStorage.getItem('tokens');

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

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(

    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>

);
