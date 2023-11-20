import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Home from "../../src/app/pages/home/home";
import Cookies from "universal-cookie";

const getToolsMock = {
  execute: jest.fn().mockResolvedValue({ data: [] }),
};
const deleteToolMock = {
  execute: jest.fn().mockResolvedValue({}),
};

const cookiesMock = new Cookies();

describe("Home Component", () => {
  beforeEach(async () => {
   await act(async () => {
    render(
      <MemoryRouter>
        <Home getTools={getToolsMock} deleteTool={deleteToolMock} cookies={cookiesMock} />
      </MemoryRouter>
    );
  });
   })
  test("renders the home component correctly", async () => {
    expect(screen.getByPlaceholderText("Buscar por tag")).toBeInTheDocument();
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  test("loads tools and renders them", async () => {
  act(() => {
    getToolsMock.execute.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Tool 1",
          link: "https://example.com",
          description: "Description of Tool 1",
          tags: ["tag1", "tag2"],
        },
      ],
    });
   })

    render(
      <MemoryRouter>
        <Home getTools={getToolsMock} deleteTool={deleteToolMock} cookies={cookiesMock} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Tool 1")).toBeInTheDocument();
      expect(screen.getByText("Description of Tool 1")).toBeInTheDocument();
    });
  });
});