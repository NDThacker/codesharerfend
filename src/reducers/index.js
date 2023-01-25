import { loggingReducer } from './loggingReducer';
import { starNCreateReducer } from './starNCreateReducer';
import { combineReducers } from 'redux';

export default combineReducers({
	loggingReducer,
	starNCreateReducer
})