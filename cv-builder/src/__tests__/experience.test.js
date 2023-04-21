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
        const testFunction = jest.fn();
        render(<Experience/>);
        })
    test('AddExperience Component rendered properly', () => {
        const testFunction = jest.fn();
        render(<AddExperience/>);
        })

    test('suggestions list id displayed', () => {
        render(<Experience/>);
        const listExperience = screen.queryByTestId('list');
        wait(1, () => {expect(listExperience).toBeInTheDocument();
        })
    }); 
});

describe('test the validity of input fields', () => {

    test('Company name field', () => {
        render(<AddExperience/>);
        const textInput = screen.getAllByTestId('text-input');
        expect(textInput[0]).toBeInTheDocument();
        expect(textInput[1]).toBeInTheDocument();
        expect(textInput[2]).toBeInTheDocument();
    });
});