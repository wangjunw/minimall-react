import { combineReducers } from 'redux';
import headerReducer, {key as headerKey} from '../components/header/HeaderContainer'
const reducers = combineReducers({
    [headerKey]: headerReducer
});
export default reducers;
