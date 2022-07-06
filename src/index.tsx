import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";
import {IContext} from "./types/context";

export const Context = createContext<null | IContext>(null)



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(


        <BrowserRouter>
            <App />
        </BrowserRouter>


);
