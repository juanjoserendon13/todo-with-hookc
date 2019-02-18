import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Form from "./components/Form";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("render app component in isolated mode", () => {
    // The shallow function allow to render the
    // component without including its children
    const appComponent = shallow(<App debug />);
    expect(appComponent).toMatchSnapshot();
  });

  it("add todo when submit and click the todo", () => {
    const appComponent = mount(<App />);
    const form = appComponent.find("form");
    const input = appComponent.find("input");
    let prevented = false;
    input.simulate("change", { target: { value: "new todo" } });
    form.simulate("submit", { preventDefault: () => (prevented = true) });

    const todo = appComponent.find("div.todo");

    // expect(input.props().value).toEqual("new todo");
    expect(prevented).toBe(true);
    expect(todo.length).toBe(1);
    expect(todo.text()).toBe("new todo");

    console.log(todo.debug());
    todo.simulate("click");
    appComponent.update();
    expect(todo.props().style).toHaveProperty("textDecoration", "line-through");
  });
});
