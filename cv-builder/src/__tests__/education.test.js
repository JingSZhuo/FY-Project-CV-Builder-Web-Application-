import React from "react";
import { Education, AddEducation, generateKey, ReactQuill } from "../cv_section_components/Education.js";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { wait } from "@testing-library/user-event/dist/utils";

describe('AddEducation Component - Submit Form', () => {
    test('user presses submit', async () => {
        const onSubmitFunction = jest.fn();  
        window.alert = onSubmitFunction;   
        const { getByTestId } = render(<AddEducation onSubmit={onSubmitFunction}/>);
        fireEvent.click(getByTestId('submit-edu'));

        expect(onSubmitFunction).toHaveBeenCalledTimes(1);
    });
});

test('function take index as argument and returns index', () => {
    const index = 0;
    expect(generateKey(index)).toBe(index);
});


describe('Education Component - Rendering', () => {
    test('Whole Education component loads', () => {
        render(<Education/>);
    });
    test('AddEducation component loads', () => {
        render(<AddEducation/>);
    });

    test('Institution field rendered properly', () => {
        render(<AddEducation/>);
        const x = screen.getByTestId('institution-field');
        expect(x).toBeInTheDocument();
    });
    test('City field rendered properly', () => {
        render(<AddEducation/>);
        const x = screen.getByTestId('city-field');
        expect(x).toBeInTheDocument();
    });
    test('Course field rendered properly', () => {
        render(<AddEducation/>);
        const x = screen.getByTestId('course-field');
        expect(x).toBeInTheDocument();
    });
    test('Start-date field rendered properly', () => {
        render(<AddEducation/>);
        const x = screen.getByTestId('startdate-field');
        expect(x).toBeInTheDocument();
    });
    test('End-date field rendered properly', () => {
        render(<AddEducation/>);
        const x = screen.getByTestId('enddate-field');
        expect(x).toBeInTheDocument();
    });
    test('React-quill field rendered properly', () => {
        render(<ReactQuill/>);
    });

    test('Load education data from firestore', () => {
        render(<Education/>)
        const listEducation = screen.queryByTestId('list-edu')
        wait(1, () => {expect(listEducation).toBeInTheDocument();
        })
    });
});

describe('AddEducation Component - Attribute check', () => {

    test('Institution field attributes check [id, type, name]', () => {
        render(<AddEducation/>);
        const y = screen.getByTestId('institution-field');
        expect(y).toHaveAttribute('id', 'institution');
        expect(y).toHaveAttribute('type', 'text');
        expect(y).toHaveAttribute('name', 'institution');
    });
    test('City field attributes check [id, type, name]', () => {
        render(<AddEducation/>);
        const y = screen.getByTestId('city-field');
        expect(y).toHaveAttribute('id', 'city');
        expect(y).toHaveAttribute('type', 'text');
        expect(y).toHaveAttribute('name', 'city');
    });
    test('Course field attributes check [id, type, name]', () => {
        render(<AddEducation/>);
        const y = screen.getByTestId('course-field');
        expect(y).toHaveAttribute('id', 'course');
        expect(y).toHaveAttribute('type', 'text');
        expect(y).toHaveAttribute('name', 'course');
    });
    test('Start-date field attributes check [id, type, name]', () => {
        render(<AddEducation/>);
        const y = screen.getByTestId('startdate-field');
        expect(y).toHaveAttribute('id', 'startdate');
        expect(y).toHaveAttribute('type', 'date');
        expect(y).toHaveAttribute('name', 'startdate');
    });
    test('End-date field attributes check [id, type, name]', () => {
        render(<AddEducation/>);
        const y = screen.getByTestId('enddate-field');
        expect(y).toHaveAttribute('id', 'enddate');
        expect(y).toHaveAttribute('type', 'date');
        expect(y).toHaveAttribute('name', 'enddate');
    });
});