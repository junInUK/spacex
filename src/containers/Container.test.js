import React from 'react';
import Container from './Container';
import TopButton from '../components/TopButton';
import LeftLaunch from '../components/LeftLaunch';
import ListBox from '../components/ListBox';
import LaunchDetail from '../components/LaunchDetail';
import { shallow, mount } from 'enzyme';			

describe('Container', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Container />));

    it("should render four <div>", () => {
        expect(wrapper.find("div").length).toEqual(4);
    });

    it("should render a TopButton", () => {
        expect(wrapper.containsMatchingElement(<TopButton />)).toEqual(true);
    });

    it("should render a LeftLaunch", () => {
        expect(wrapper.containsMatchingElement(<LeftLaunch />)).toEqual(true);
    });

    it("should render a ListBox", () => {
        expect(wrapper.containsMatchingElement(<ListBox />)).toEqual(true);
    });

    it("should render TopButton, LeftLaunch and ListBox together", () => {
        expect(wrapper.containsAllMatchingElements([
            <TopButton />,
            <LeftLaunch />,
            <ListBox />
        ])).toEqual(true);
    });

    it("renders corrently", () => {
        expect(wrapper).toMatchSnapshot();
    });
});

describe("Mounted Container", () => {
    it("should call reloadData when the reload button is clicked", () => {
        const spy = jest.spyOn(Container.prototype, "reloadData");
        const wrapper = mount(<Container/>);
        const topButton = wrapper.find("TopButton");
        wrapper.find("#reload-button").simulate("click");
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should call selectYear when the Filter by Year button is clicked", () => {
        const spy = jest.spyOn(Container.prototype, "selectYear");
        const wrapper = mount(<Container/>);
        const ListBox = wrapper.find("ListBox");
        wrapper.find("#select-year").simulate("change");
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should call descendSort when the Sort Descending button is clicked", () => {
        const spy = jest.spyOn(Container.prototype, "descendSort");
        const wrapper = mount(<Container/>);
        const ListBox = wrapper.find("ListBox");
        wrapper.find("#sort-descend").simulate("click");
        console.log(wrapper.instance().state.launchLists.length);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should render one image in LeftLaunch component", () => {
        const wrapper = mount(<Container />);
        const leftLaunch = wrapper.find("LeftLaunch");
        expect(leftLaunch.find("img").length).toEqual(1);
    });

    it("should has 111 launch lists when the reload button is clicked", () => {
        const spy = jest.spyOn(Container.prototype, "reloadData");
        const wrapper = mount(<Container/>);
        const listBox = wrapper.find("ListBox");
        const launchDetails = listBox.find("LaunchDetail");
        wrapper.find("#reload-button").simulate("click");
        console.log(wrapper.state('launchLists').length);
        expect(spy).toHaveBeenCalledTimes(1);
    });

});