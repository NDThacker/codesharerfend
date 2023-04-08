import enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DisplaySnippets from "../components/DisplaySnippets";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import { faker } from "@faker-js/faker";

const names = ["User1", "User2", "User3", "User4", "User5", "User6", "User7", "User8", "User9", "User10"];
const pass = "pass";
const sampleEmail = "sample@g.com";
let usersList = [];

for(let itr = 0; itr < 9; itr++)
{
	usersList.push({
		email: faker.internet.email(),
		name: names[itr],
		password: pass
	})
}
usersList.push({
	email: sampleEmail,
	password: pass,
	name: names[9]
});

let snippetList = [];

for(let itr = 0; itr < 9; itr++)
{
	snippetList.push({
		expiryTime: faker.date.future(),
		content: faker.lorem.paragraph(4),
		title: faker.lorem.word(),
		author: faker.name.firstName()

	});
}


enzyme.configure({adapter: new Adapter() });

describe("Testing DisplaySnipets Component", () => {
	
	it("should display snippets properly 1", () => {
		const displayComp = shallow(<DisplaySnippets.WrappedComponent fData={[]}/>);
		const text = displayComp.find('h4').text();
		expect(text).toEqual('No Results');
	});
	it("should display snippets properly 2", () => {
		const displayComp = shallow(<DisplaySnippets.WrappedComponent fData={null}/>);
		const text = displayComp.find('h4').text();
		expect(text).toEqual('No Results');
	});
	it("should display snippets properly 3", () => {
		const displayComp = shallow(<DisplaySnippets.WrappedComponent fData={snippetList[2]}/>);
		expect(displayComp.find('ViewSnippet')).toBeTruthy();
	});
	it("should display snippets properly 4", () => {
		const displayComp = shallow(<DisplaySnippets.WrappedComponent fData={snippetList}/>);
		expect(displayComp.find('span').length).toBe(9);
		let spanEle = displayComp.find('div.col-md-3');
		spanEle = spanEle.at(1);
		spanEle = spanEle.find('span');
		spanEle.simulate('click');
		expect(displayComp.find('ViewSnippet')).toBeTruthy();
	});


})

describe("Testing Login and Signup Components", () => {
	it("should display LogIn Component properly", () => {
		const loginComp = shallow(<LogIn.WrappedComponent />);
		expect(loginComp.find('input').length).toBe(3);
		let submitBtn = loginComp.find("input[type='submit']");
		expect(submitBtn.length).toBe(1);
		expect(submitBtn.prop('disabled')).toBeTruthy();
	})
	it("should display SignUp Component properly", () => {
		const signupComp = shallow(<SignUp />);
		expect(signupComp.find('input').length).toBe(4);
		let submitBtn = signupComp.find("input[type='submit']");
		expect(submitBtn.length).toBe(1);
		expect(submitBtn.prop('disabled')).toBeTruthy();

	})
})

