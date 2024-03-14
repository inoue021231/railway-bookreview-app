describe("入力フォームテスト", () => {
  it("メールエラー表示チェック", () => {
    const testEmail = "abcd";
    cy.visit("http://localhost:3000/login");
    cy.get("form > .signupInner > #emailForm > input").type(testEmail);
    cy.get("form > .submit").click();
    cy.get("form > .signupInner > #emailForm > .errorText").should(
      "be.visible"
    );
  });

  it("メールエラー非表示チェック", () => {
    const testEmail = "abcd@abcd.com";
    cy.visit("http://localhost:3000/login");
    cy.get("form > .signupInner > #emailForm > input").type(testEmail);
    cy.get("form > .submit").click();
    cy.get("form > .signupInner > #emailForm > .errorText").should(
      "not.be.visible"
    );
  });

  it("パスワードエラー表示チェック", () => {
    const testPassword = "abcd";
    cy.visit("http://localhost:3000/login");
    cy.get("form > .signupInner > #passwordForm > input").type(testPassword);
    cy.get("form > .submit").click();
    cy.get("form > .signupInner > #passwordForm > .errorText").should(
      "be.visible"
    );
  });

  it("パスワードエラー非表示チェック", () => {
    const testPassword = "abcd1234";
    cy.visit("http://localhost:3000/login");
    cy.get("form > .signupInner > #passwordForm > input").type(testPassword);
    cy.get("form > .submit").click();
    cy.get("form > .signupInner > #passwordForm > .errorText").should(
      "not.be.visible"
    );
  });
});
