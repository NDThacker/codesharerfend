export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";


export const logInAction = (uData) => ({
	type: USER_LOGIN,
	uData
})

export const logOutAction = () => ({
	type: USER_LOGOUT
})