import tcoReducer from './tco';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    tco: tcoReducer
})

export default allReducers;