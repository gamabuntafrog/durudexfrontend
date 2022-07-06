import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useEffect, useState} from 'react';
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    useApolloClient,
} from "@apollo/client";
import {tokensType} from "./types/auth";
import Main from "./Components/Main";



function App() {

    const storageTokens = localStorage.getItem('tokens');
    const [tokens, setTokens] = useState<tokensType | null>(storageTokens ? JSON.parse(storageTokens) : null);

    const httpLink = new HttpLink({ uri: 'https://api.dev.durudex.com/query' });
    const authLink = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: tokens ?
                {
                    Authorization: `Bearer ${tokens.accessToken}`
                } : {}
        })
        return forward(operation)
    })

    const client = useApolloClient(new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    }))


    return (
        <ApolloProvider client={client}>
            <Main tokens={tokens} setTokens={setTokens}/>
        </ApolloProvider>
    )

}

export default App;
