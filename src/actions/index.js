export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";


export const logInUser = (uData) => ({
	type: USER_LOGIN,
	uData
})

export const logOutUser = () => ({
	type: USER_LOGOUT
})