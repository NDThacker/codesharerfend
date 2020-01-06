import { USER_LOGIN, USER_LOGOUT} from '../actions'


export const loggingReducer = (state = { uData: null, starred: null, created: null }, action) => {
	switch(action.type)
	{
		case USER_LOGIN:
			state.starred = action.uData.starred;
			state.created = action.uData.created;
			delete action.uData.starred;
			delete action.uData.created;
			state.creds = action.uData;
			return state
		case USER_LOGOUT:
			state.uData = null;
			state.starred = null;
			state.created = null;
			return state;
		default:
			return state;
	}
}