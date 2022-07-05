import {tokensType} from "./auth";
import {userType} from "./user";

export interface IContext {
    tokens: tokensType | null,
    user: userType | null,
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    getTokens: (tokens: tokensType | null) => void,
    getUser: (data: userType | null) => void
}