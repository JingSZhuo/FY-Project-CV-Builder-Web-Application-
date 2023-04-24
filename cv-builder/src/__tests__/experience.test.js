import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AddExperience, Experience, generateKey } from "../cv_section_components/Experience";
import { wait } from "@testing-library/user-event/dist/utils";

describe('Experience Component renders correctly', () => {

    test('function take index as argument and returns index', () => {
        const index = 0;
        expect(generateKey(index)).toBe(index);
    });

    test('Experience Component rendered properly', () => {
        render(<Experience/>);
        })
    test('AddExperience Component rendered properly', () => {
        render(<AddExperience/>);
        })

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