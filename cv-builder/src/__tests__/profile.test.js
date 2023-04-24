import React from "react";
import Profile from "../cv_section_components/Profile";
import { fireEvent, render,  screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

describe('Profile Component', () => {
    test('user presses submit button and it gives a response to the user (pass or fail)', () => {
        const onSubmit = jest.fn();             //mock function
        window.alert = onSubmit;                //Because the function uses window.alert(...) -> its not availble in node.js env with jest, this will provide a mock window.alert to work with
        const { getByTestId } = render(<Profile onSubmit={onSubmit}/>);

        fireEvent.click(getByTestId('submit'));

        expect(onSubmit).toHaveBeenCalledWith("Something went wrong with data input");
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
});

describe('Input field value changes with user input', () => {
    test('first name value changes when user types', () => {
        const firstNameValueFromFireStore = 'testFirstName';
        render(<Profile/>)
        userEvent.type(screen.getByTestId('f-name'), firstNameValueFromFireStore)
        waitFor(() => {
            expect(screen.getByTestId('f-name')).toHaveValue(firstNameValueFromFireStore);
        })
    });

    //...do for all input fields
});