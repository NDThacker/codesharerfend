export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const ADD_TO_STARRED = "ADD_TO_STARRED";
export const REMOVE_FROM_STARRED = "REMOVE_FROM_STARRED";
export const ADD_IN_CREATED = "ADD_IN_CREATED";
export const INIT_STARRED = "INIT_STARRED";
export const INIT_CREATED = "INIT_CREATED";


export const logInAction = (uData) => ({
	type: USER_LOGIN,
	uData
})

export const logOutAction = () => ({
	type: USER_LOGOUT
})

export const addToStarredAction = (snippet) => ({
	type: ADD_TO_STARRED,
	snippet
})

export const removeFromStarredAction = (sId) => ({
	type: REMOVE_FROM_STARRED,
	sId
})

export const addToCreatedAction = (snippet) => ({
	type: ADD_IN_CREATED,
	snippet
})

export const initStarred = (starred) => ({
	type: INIT_STARRED,
	starred
})

export const initCreated = (created) => ({
	type: INIT_CREATED,
	created
})