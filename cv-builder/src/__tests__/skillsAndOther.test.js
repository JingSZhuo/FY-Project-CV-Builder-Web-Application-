import React from "react";
import Skills from "../cv_section_components/Skills";
import Other from "../cv_section_components/Other";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

describe('Skills and Other Component- Rendering', () => {

    test('react-quill rendering', () => {
        render(<Skills/>);
        const x = screen.getByTestId('text-input');
        expect(x).toBeInTheDocument();
    });

    test('react-quill rendering', () => {
        render(<Other/>);
        const x = screen.getByTestId('text-input');
        expect(x).toBeInTheDocument();
    });
});