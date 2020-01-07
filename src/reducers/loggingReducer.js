import { USER_LOGIN, USER_LOGOUT} from '../actions'


export const loggingReducer = (state = { uData: null }, action) => {
	switch(action.type)
	{
		case USER_LOGIN:
			delete action.uData.starred;
			delete action.uData.created;
			state.creds = action.uData;
			return state
		case USER_LOGOUT:
			state.uData = null;
			return state;
		default:
			return state;
	}
}