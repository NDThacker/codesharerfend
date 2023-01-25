import { INIT_CREATED, INIT_STARRED, ADD_TO_STARRED, REMOVE_FROM_STARRED, ADD_IN_CREATED } from '../actions';


export const starNCreateReducer = (state = { starred: [], created: [] }, action) => {
	switch (action.type) {
		
		case INIT_CREATED:
			// console.log("initiated " + action.created);
			state.created = state.created.concat(action.created);
			return state;

		case INIT_STARRED:
			// console.log("initiated " + action.starred);
			state.starred = state.starred.concat(action.starred);
			return state;

		case ADD_TO_STARRED:
			state.starred.push(action.sid);
			return state;

		case REMOVE_FROM_STARRED:
			state.starred = state.starred.filter((ele) => {
				if (ele != action.sid)
					return true;
				else return false;
			});
			return state;

		case ADD_IN_CREATED:
			state.created.push(action.sid);
			return state;

		default:
			return state;
	}
}