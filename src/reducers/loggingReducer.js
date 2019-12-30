import { USER_LOGIN, USER_LOGOUT} from '../actions'


export const loggingReducer = (state = { uData: null }, action) => {
	switch(action.type)
	{
		case USER_LOGIN:
			state.uData = action.uData;
			break;
		case USER_LOGOUT:
			state.uData = null;
			break;
		default:
			return state;
	}
}