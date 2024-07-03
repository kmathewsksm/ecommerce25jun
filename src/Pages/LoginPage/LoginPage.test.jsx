import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LoginPage } from "./LoginPage";
import users from "../../assets/users.json";

describe("LoginPage", () => {
  const setup = () => {
    const onLogin = jest.fn();
    const utils = render(<LoginPage onLogin={onLogin} />);
    const usernameInput = utils.getByPlaceholderText("Username/Email Address");
    const passwordInput = utils.getByPlaceholderText("Password");
    const loginButton = utils.getByText("Sign in");
    return {
      usernameInput,
      passwordInput,
      loginButton,
      onLogin,
      ...utils,
    };
  };

  it("renders the login page", () => {
    setup();
    expect(screen.getByText("Ecommerce")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Username/Email Address")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("allows typing in the username and password fields", () => {
    const { usernameInput, passwordInput } = setup();
    fireEvent.change(usernameInput, { target: { value: "john@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "m38rmF$" } });
    expect(usernameInput.value).toBe("john@gmail.com");
    expect(passwordInput.value).toBe("m38rmF$");
  });

  it("calls the handleLogin function when the login button is clicked", () => {
    const { usernameInput, passwordInput, loginButton, onLogin } = setup();
    fireEvent.change(usernameInput, { target: { value: "john@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "m38rmF$" } });
    fireEvent.click(loginButton);
    expect(onLogin).toHaveBeenCalledWith("john@gmail.com");
  });

  it("validates user credentials correctly", () => {
    const { usernameInput, passwordInput, loginButton, onLogin } = setup();

    // Valid user
    fireEvent.change(usernameInput, { target: { value: "john@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "m38rmF$" } });
    fireEvent.click(loginButton);
    expect(onLogin).toHaveBeenCalledWith("john@gmail.com");

    // Invalid user
    fireEvent.change(usernameInput, { target: { value: "invalid@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);
    expect(onLogin).not.toHaveBeenCalledWith("invalid@gmail.com");
  });

  it("calls onLogin callback when login is successful", () => {
    const { usernameInput, passwordInput, loginButton, onLogin } = setup();
    fireEvent.change(usernameInput, { target: { value: "john@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "m38rmF$" } });
    fireEvent.click(loginButton);
    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith("john@gmail.com");
  });

  it("displays the correct messages on login success and failure", () => {
    console.log = jest.fn();
    const { usernameInput, passwordInput, loginButton } = setup();

    // Successful login
    fireEvent.change(usernameInput, { target: { value: "john@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "m38rmF$" } });
    fireEvent.click(loginButton);
    expect(console.log).toHaveBeenCalledWith("Login successful");

    // Failed login
    fireEvent.change(usernameInput, { target: { value: "invalid@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);
    expect(console.log).toHaveBeenCalledWith("Login failed");
  });
});
