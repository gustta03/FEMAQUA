
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; 

import Cookies from "universal-cookie";
import Login from "../../src/app/pages/login/login";

jest.mock("universal-cookie");

describe("Login Component", () => {
  test("submits the form successfully", async () => {
    const authenticationMock = {
      execute: jest.fn().mockResolvedValue({ data: { access_token: "mockToken" } }),
    };

    const cookiesMock = new Cookies();

    render(
      <MemoryRouter>
        <Login authentication={authenticationMock} cookies={cookiesMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "password123" } });


    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(authenticationMock.execute).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(cookiesMock.set).toHaveBeenCalledWith("access_token", "mockToken");
    });
  });
});
