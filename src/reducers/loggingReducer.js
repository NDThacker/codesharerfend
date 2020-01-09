import { USER_LOGIN, USER_LOGOUT} from '../actions'


export const loggingReducer = (state = { }, action) => {
	switch(action.type)
	{
		case USER_LOGIN:
			delete action.uData.starred;
			delete action.uData.created;
			state = action.uData;
			return state
		case USER_LOGOUT:
			state = {};
			return state;
		default:
			return state;
	}
}