import React from "react";
import Profile from "../cv_section_components/Profile";
import { fireEvent, render } from '@testing-library/react';


describe('Profile Component', () => {
    test('user presses submit button and it gives a response to the user (pass or fail)', () => {
        const onSubmit = jest.fn();             //mock function
        window.alert = onSubmit;                //Because the function uses window.alert(...) -> its not availble in node.js env with jest, this will provide a mock window.alert to work with
        const { getByTestId } = render(<Profile onSubmit={onSubmit}/>);

        fireEvent.click(getByTestId('submit'));

        //expect(onSubmit).toHaveBeenCalledWith("Something went wrong with data input");
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
});