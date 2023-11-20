import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tool from '../../src/app/pages/tool/tool';
import { Cookie } from 'universal-cookie';

const saveToolMock = {
  execute: jest.fn(),
};

const cookiesMock: Cookie = {
  get: jest.fn(),
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('Tool Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
    
  });

  test('renders Tool component correctly', () => {
    const { getByText, getByLabelText } = render(
      <Tool saveTool={saveToolMock} cookies={cookiesMock} />
    );

    expect(getByText('Adicionar nova ferramenta')).toBeInTheDocument();
    expect(getByLabelText('Titulo')).toBeInTheDocument();
    expect(getByLabelText('Link')).toBeInTheDocument();
    expect(getByLabelText('Descrição')).toBeInTheDocument();
    expect(getByLabelText('Tags')).toBeInTheDocument();
  });

  test('handles form submission correctly', async () => {
    const { getByLabelText, getByText } = render(
      <Tool saveTool={saveToolMock} cookies={cookiesMock} />
    );

    fireEvent.change(getByLabelText('Titulo'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Link'), { target: { value: 'http://test.com' } });
    fireEvent.change(getByLabelText('Descrição'), { target: { value: 'Test Description' } });
    fireEvent.change(getByLabelText('Tags'), { target: { value: 'tag1, tag2' } });

    fireEvent.click(getByText('Salvar'));

    await waitFor(() => {
      expect(saveToolMock.execute).toHaveBeenCalledWith({
        token: undefined, 
        data: {
          title: 'Test Title',
          link: 'http://test.com',
          description: 'Test Description',
          tags: ['tag1', 'tag2'],
        },
      });
    });
  });

});
