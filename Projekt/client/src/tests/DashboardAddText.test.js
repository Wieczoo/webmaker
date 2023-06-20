import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import PageEditorBeta from './../pages/PageEditorBeta';
import { waitFor } from '@testing-library/react'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => jest.fn(),
 }));

test('adding new text element to site and rename it',async()=>{

    render(
        <PageEditorBeta/>
    );
    await waitFor(() => {
        fireEvent.click(screen.getByTestId('add_button'));
    })
    
    await waitFor(() => {
        expect(screen.getByText("Add page")).toBeInTheDocument();
        fireEvent.change(screen.getByTestId("input_add_title"),{target: { value: "New test page" }});
        expect(screen.getByTestId('input_add_title').value).toBe("New test page");
        fireEvent.click(screen.getByText('Add page'));
    })

    await waitFor(() => {
        expect(screen.getByTestId('new_page_test')).toHaveTextContent("New test page");
    })

    await waitFor(() => {
        fireEvent.click(screen.getByText('Layout'));
    })

    await waitFor(() => {
        fireEvent.click(screen.getByText('Div'));
    })

    await waitFor(() => {
        fireEvent.click(screen.getByText('Text'));
    })

    await waitFor(() => {
        const divElement = screen.getByText("Sample Text"); 
        divElement.textContent = 'Test Text';
    })

    await waitFor(() => {
        expect(screen.getByText('Test Text')).toBeInTheDocument();
    })
   

})