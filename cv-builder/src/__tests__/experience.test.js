import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AddExperience, Experience, generateKey } from "../cv_section_components/Experience";
import { wait } from "@testing-library/user-event/dist/utils";

test('function take index as argument and returns index', () => {
    const index = 0;
    expect(generateKey(index)).toBe(index);
});

describe('Experience Component - Rendering', () => {
    test('Whole Experience Component renders', () => {
        render(<Experience/>);
    });
    test('Whole AddExperience Component renderes', () => {
        render(<AddExperience/>);
    });
    test('suggestions list id displayed', () => {
        render(<Experience/>);
        const listExperience = screen.queryByTestId('list');
        wait(1, () => {expect(listExperience).toBeInTheDocument();
        })
    }); 
});

describe('test the rendering of input fields', () => {

    test('all text-fields form', () => {
        render(<AddExperience/>);
        const textInput = screen.getAllByTestId('text-input');
        expect(textInput[0]).toBeInTheDocument();
        expect(textInput[1]).toBeInTheDocument();
        expect(textInput[2]).toBeInTheDocument();
        expect(textInput[3]).toBeInTheDocument();
    });

    test('all date-fields form', () => {
        render(<AddExperience/>);
        const dateInput = screen.getAllByTestId('date-input');
        expect(dateInput[0]).toBeInTheDocument();
        expect(dateInput[1]).toBeInTheDocument();
    });

    test('submit input tag rendered', () => {
        render(<AddExperience/>);
        const submit = screen.getByTestId('submit-input');
        expect(submit).toBeInTheDocument();
    })
});

describe('AddExperience Component - Attribute check', () => {

    test('Field attributes check (type:text) [id, type, name]', () => {
        render(<AddExperience/>);
        const y = screen.getAllByTestId('text-input');
        const z = screen.getAllByTestId('date-input');


        expect(y[0]).toHaveAttribute('type', 'text');
        expect(y[1]).toHaveAttribute('type', 'text');
        expect(y[2]).toHaveAttribute('type', 'text');

        expect(y[0]).toHaveAttribute('id', 'jobtitle');
        expect(y[0]).toHaveAttribute('name', 'jobtitle');
        expect(y[1]).toHaveAttribute('id', 'city');
        expect(y[1]).toHaveAttribute('name', 'city')
        expect(y[2]).toHaveAttribute('id', 'company');
        expect(y[2]).toHaveAttribute('name', 'company');

        expect(z[0]).toHaveAttribute('type', 'date');
        expect(z[1]).toHaveAttribute('type', 'date');

        expect(z[0]).toHaveAttribute('id', 'startdate');
        expect(z[0]).toHaveAttribute('name', 'startdate');
        expect(z[1]).toHaveAttribute('id', 'enddate');
        expect(z[1]).toHaveAttribute('name', 'enddate');
    });
});