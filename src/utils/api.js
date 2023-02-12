import axios from 'axios';

const apiUrl = "http://localhost:1050/";

export const updateStarredInUser = (starred) => {
	return axios.put(apiUrl + "updatestarredinuser", {starred}).then(responseStatus => {
		return responseStatus;
	}).catch(error => {
		let err = new Error();
		if(error.response)
		{
			err.message = error.response.data.message;
		}
		else {
			err.message = "Server Down..!";
		}
	})
}

export const updateCreatedInUser = (created) => {
	return axios.put(apiUrl + "updatecreatedinuser", {created}).then(responseStatus => {
		return responseStatus;
	}).catch(error => {
		let err = new Error();
		if(error.response)
		{
			err.message = error.response.data.message;
		}
		else {
			err.message = "Server Down..!";
		}
	})

}



export const getSnippetById = (sId) => {
	return axios.get(apiUrl + 'getsnippetbyid/' + sId).then(response => {
		return response.data;
	}).catch(error => {
		let err = new Error();
		if (error.response) {
			err.message = error.response.data.message;
		}
		else {
			err.messsage = "Server Down..!";
		}
		throw err;
	})
}

export const submitSnippetToUser = (sid, email) => {
	return axios.put(apiUrl + 'submitsnippettouser', {sid: sid, email: email}).then(response => {
		return response.data;
	}).catch(error => {
		let err = new Error();
		if(error.response) {
			err.message = error.response.data.message;
		}
		else {
			err.message = "Server Down..!";
		}
	})
}

export const submitSnippet = (sObj) => {
	return axios.post(apiUrl + 'submitsnippet', sObj).then(response => {
		return response.data;
	}).catch(error => {
		let err = new Error();
		if(error.response) {
			err.message = error.response.error; //error.response.data.message;
		}
		else {
			err.message = "Server Down..!";
		}
		throw err;
	})
}

export const searchSnippetByTitle = (title) => {
	return axios.get(apiUrl + 'searchsnippetbytitle/' + title).then(response => {
		return response.data;
	}).catch(error => {
		let err = new Error();
		if(error.response) {
			console.log(error.response);
			err.message = error.response.data.message;
		}
		else {
			err.message = "Server Down..!";
		}
		throw err;
	})
}

export const editSnippet = (sid, content) => {
	return axios.put(apiUrl + 'editsnippet/' + sid, content).then(response => {
		return response.data;
	}).catch(error => {
		let err = new Error();
		if(error.response) {
			err.message = error.response.data.message;
		}
		else {
			err.message = "Server Down..!";
		}
		throw err;
	})
}

/* udata in signup consisting of name, emailid and password */

export const signUpUser = (udata) => {
	return axios.post(apiUrl + 'signup/', udata).then(response => {
		return response.data;
	}).catch(error => {
		let err = new Error();
		if(error.response) {
			err.message = error.response.data.message;
		}
		else {
			err.message = "Server Down..!";
		}
		throw err;
	})
}

/* cdata in loginUser consists of emailid and password */
export const logInUser = (cdata) => {
	return axios.post(apiUrl + 'login/', cdata).then(response => {
		return response.data;
	}).catch(error => {
		let err = new Error();
		if(error.response) {
			console.log(error.response)
			err.message = error.response.data.error;
		}
		else {
			err.message = "Server Down..!";
		}
		throw err;
	})
}

