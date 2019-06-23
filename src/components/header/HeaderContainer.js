import { _post } from '../../utils/request';
export const key = 'header';
const LOGIN = `${key}/LOGIN`;
const LOGIN_SUCCESS = `${key}/LOGIN_SUCCESS`;
const LOGOUT = `${key}/LOGOUT`;
const LOGOUT_SUCCESS = `${key}/LOGOUT_SUCCESS`;
const FAILURE = `${key}/FAILURE`;
const initialState = {
    userInfo: {},
    authed: false
};
const login = () => ({
    type: LOGIN
});
const failure = () => ({
    type: FAILURE
});
const loginSuccess = res => ({
    type: LOGIN_SUCCESS,
    payload: res
});
const loginHandler = () => {
    return dispatch => {
        dispatch(login());
        return _post('/user/login', {
            username: 'admin',
            password: 'admin'
        })
            .then(res => {
                dispatch(loginSuccess(res));
            })
            .catch(() => {
                dispatch(failure());
            });
    };
};
const logoutHandler = () => {};
export const actions = { loginHandler, logoutHandler };
const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state
            };
        case 'FAILURE':
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
};

export default headerReducer;
