/** @format */
import testData from "../fixtures/test-data.json";
import { templatePage } from "../pom/storyteq.cy";

//automating happy flows

beforeEach(() => {
  cy.session("createTemplate", () => {
    cy.login(testData.usr, testData.pwd);
  });
});

describe("Storyteq Challenge scenario one and two", () => {
  it("should successfully create a template", () => {
    cy.intercept(
      "https://api.storyteq.com/v4/content/folders?filter[parent_id]=null&sort=-created_at"
    ).as("waitAfetLoad");
    cy.visit("/");
    cy.visit("https://platform.storyteq.com/builder/#/"); // there is a bug here
    cy.get(templatePage.templateBanner).should("be.visible");
    cy.get(templatePage.templateBannerTab).click();
    cy.get(templatePage.templateItems).contains("Billboard").click();
    cy.get(templatePage.templateTitleField).type("TestSeda");
    cy.get(templatePage.createTemplateBtn).click();
    cy.wait("@waitAfetLoad");
    cy.get(templatePage.createRectangle).click();
    cy.get(templatePage.layer).contains("Rectangle").should("exist");
    cy.get(templatePage.horizontalAlign).click();
    cy.get(templatePage.verticalAlign).click();
    cy.get(templatePage.strokeCheckbox).click();
    cy.get(templatePage.strokeCheckbox).should("have.class", "is-checked");
    cy.get(templatePage.publishTemplate).click();
    cy.get(templatePage.confirmPublish).contains("Publish").click();
    cy.get(templatePage.breadcrumbTemplate).click();
    cy.get(templatePage.templateCard("TestSeda")).should("exist");
  });
});
