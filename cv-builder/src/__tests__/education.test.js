import React from "react";
import { AddEducation } from "../cv_section_components/Education";
import { fireEvent, render } from '@testing-library/react'

describe('Education Component', () => {
    test('user presses submit', async () => {
        const onSubmitFunction = jest.fn();  
        window.alert = onSubmitFunction;   
        const { getByTestId } = render(<AddEducation onSubmit={onSubmitFunction}/>);
        fireEvent.click(getByTestId('submitedu'));

        expect(onSubmitFunction).toHaveBeenCalledTimes(1);
    });
});