
export interface IUser {
    id: string | null
}

export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
}

type FetchUserAction = {
    type: UserActionTypes.FETCH_USER
}

export type UserActions = FetchUserAction