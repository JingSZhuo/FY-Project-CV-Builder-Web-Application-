import React from "react";
import { Education, AddEducation, generateKey } from "../cv_section_components/Education.js";
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('AddEducation Component', () => {
    test('user presses submit', async () => {
        const onSubmitFunction = jest.fn();  
        window.alert = onSubmitFunction;   
        const { getByTestId } = render(<AddEducation onSubmit={onSubmitFunction}/>);
        fireEvent.click(getByTestId('submit-edu'));

        expect(onSubmitFunction).toHaveBeenCalledTimes(1);
    });
});

describe('Education Component', () => {
    test('function take index as argument and returns index', () => {
        const index = 0;
        expect(generateKey(index)).toBe(index);
    });
    test('component has loaded data', () => {
        render(<Education/>)
        const listEducation = screen.getByTestId('list-edu')
        expect(listEducation).toBeInTheDocument();
    });
});