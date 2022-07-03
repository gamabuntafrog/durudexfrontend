
import {UserActions, IUser, UserActionTypes} from '../../types/user'

const initialState: IUser = {
    id: null
}

export const userReducer = (state = initialState, action: UserActions): IUser => {

    switch (action.type) {
        case UserActionTypes.FETCH_USER:

            return {id: '1'}
        default:
            return state
    }


}