import { LOGGED_USER } from "./AppConstants"

const AppReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case LOGGED_USER:
            return {
                ...state,
                logged: payload.logged,
                username: payload.username,
                role: payload.role
            }
        default:
            return state
    }
}

export default AppReducer