import React from "react";
import Profile from "../cv_section_components/Profile";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('Profile component - Submit Form', () => {
    test('user presses submit button and it gives a response to the user (pass or fail)', () => {
        const onSubmit = jest.fn();             //mock function
        window.alert = onSubmit;                //Because the function uses window.alert(...) -> its not availble in node.js env with jest, this will provide a mock window.alert to work with
        const { getByTestId } = render(<Profile onSubmit={onSubmit}/>);

        fireEvent.click(getByTestId('submit'));

        expect(onSubmit).toHaveBeenCalledWith("Something went wrong with data input");
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
});

describe('Profile component - Rendering', () => {
    test('Whole profile component loads', () => {
        render(<Profile/>);
    });
    
    test('First name field rendered properly', () => {
        render(<Profile/>);
        const fName = screen.getByTestId('f-name-field');
        expect(fName).toBeInTheDocument();
    });

    test('Last name field rendered properly', () => {
        render(<Profile/>);
        const lName = screen.getByTestId('l-name-field');
        expect(lName).toBeInTheDocument();
    });

    test('Email field rendered properly', () => {
        render(<Profile/>);
        const email = screen.getByTestId('email-field');
        expect(email).toBeInTheDocument();
    });

    test('Contact field rendered properly', () => {
        render(<Profile/>);
        const contact = screen.getByTestId('contact-field');
        expect(contact).toBeInTheDocument();
    });
});

describe('Profile component - Check attributes', () => {

    test('First name field attributes check [id, type, name]', () => {
        render(<Profile/>);
        const fName = screen.getByTestId('f-name-field');
        expect(fName).toHaveAttribute('id', 'fName');
        expect(fName).toHaveAttribute('type', 'text');
        expect(fName).toHaveAttribute('name', 'fName');
    });

    test('Last name field attributes check [id, type, name]', () => {
        render(<Profile/>);
        const lName = screen.getByTestId('l-name-field');
        expect(lName).toHaveAttribute('id', 'lName');
        expect(lName).toHaveAttribute('type', 'text');
        expect(lName).toHaveAttribute('name', 'lName');
    });

    test('Email field attributes check [id, type, name]', () => {
        render(<Profile/>);
        const email = screen.getByTestId('email-field');
        expect(email).toHaveAttribute('id', 'Email');
        expect(email).toHaveAttribute('type', 'email');
        expect(email).toHaveAttribute('name', 'email');
    });

    test('Contact field attributes check [id, type, name]', () => {
        render(<Profile/>);
        const contact = screen.getByTestId('contact-field');
        expect(contact).toHaveAttribute('id', 'ContactNumber');
        expect(contact).toHaveAttribute('type', 'number');
        expect(contact).toHaveAttribute('name', 'contact_number');
    });
    
});