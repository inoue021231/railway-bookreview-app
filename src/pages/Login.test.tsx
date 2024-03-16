import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("ログイン画面テスト", () => {
  test("タイトルがあるか", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const h2Element = screen.getByRole("heading");
    expect(h2Element.textContent).toBe("ログイン");
  });

  test("メールアドレスフォームがあるか", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const formElement = screen.getByLabelText("メールアドレス");
    expect(formElement.tagName).toBe("INPUT");
  });

  test("パスワードフォームがあるか", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const formElement = screen.getByLabelText("パスワード");
    expect(formElement.tagName).toBe("INPUT");
  });

  test("ログインボタンがあるか", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const buttonElement = screen.getByRole("button");
    expect(buttonElement.getAttribute("value")).toBe("ログイン");
  });

  test("登録ページへのリンクがあるか", () => {
    render(<Login />, { wrapper: BrowserRouter });
    const linkElement = screen.getByRole("link");
    expect(linkElement.getAttribute("href")).toBe("/signup");
  });
});
