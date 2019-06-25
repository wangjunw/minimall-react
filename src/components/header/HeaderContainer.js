import { _get, _post } from '../../utils/request';
export const key = 'header';
const LOGIN = `${key}/LOGIN`;
const LOGIN_SUCCESS = `${key}/LOGIN_SUCCESS`;
const LOGOUT = `${key}/LOGOUT`;
const LOGOUT_SUCCESS = `${key}/LOGOUT_SUCCESS`;
const CHECKLOGIN = `${key}/CHECKLOGIN`;
const CHECKLOGIN_SUCCESS = `${key}/CHECKLOGIN_SUCCESS`;
const FAILURE = `${key}/FAILURE`;
const initialState = {
    userInfo: {},
    authed: false
};
const checkLogin = () => ({
    type: CHECKLOGIN
});
const checkLoginSuccess = userInfo => ({
    type: CHECKLOGIN_SUCCESS,
    payload: userInfo
});
const login = () => ({
    type: LOGIN
});
const loginSuccess = userInfo => ({
    type: LOGIN_SUCCESS,
    payload: userInfo
});
const logout = () => ({
    type: LOGOUT
});
const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});
const failure = () => ({
    type: FAILURE
});
const loginHandler = () => {
    return dispatch => {
        dispatch(login());
        return _post('/user/login', {
            username: 'wang',
            password: '123456'
        })
            .then(res => {
                if (res.code !== 0) {
                    dispatch(failure());
                    return;
                }
                dispatch(loginSuccess(res.userInfo));
            })
            .catch(() => {
                dispatch(failure());
            });
    };
};
const checkLoginHandler = () => {
    return dispatch => {
        dispatch(checkLogin());
        return _get('/user/checkLogin')
            .then(res => {
                if (res.code !== 0) {
                    dispatch(failure());
                    return;
                }
                dispatch(checkLoginSuccess(res.userInfo));
            })
            .catch(err => {
                dispatch(failure());
            });
    };
};
const logoutHandler = () => {
    return dispatch => {
        dispatch(logout());
        return _post('/user/logout')
            .then(res => {
                if (res.code !== 0) {
                    dispatch(failure);
                    return;
                }
                dispatch(logoutSuccess());
            })
            .catch(err => {
                dispatch(failure());
            });
    };
};
export const actions = { loginHandler, logoutHandler, checkLoginHandler };
const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state
            };
        case CHECKLOGIN:
            return {
                ...state
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                authed: true
            };
        case CHECKLOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                authed: true
            };
        case LOGOUT:
            return {
                ...state
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                userInfo: {},
                authed: false
            };
        case FAILURE:
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
