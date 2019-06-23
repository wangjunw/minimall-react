import { combineReducers } from 'redux';
import headerReducer, {
    key as headerKey
} from '../components/header/HeaderContainer';
export default combineReducers({
    [headerKey]: headerReducer
});
