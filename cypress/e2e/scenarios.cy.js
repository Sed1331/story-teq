/** @format */
import testData from "../fixtures/test-data.json";
import { templatePage } from "../pom/storyteq.cy";

//automating happy flows

beforeEach(() => {
  cy.session("createTemplate", () => {
    cy.login(testData.usr, testData.pwd);
  });
});

after(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.getCookies().should("be.empty");
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

  it("should create a new template and add more properties", () => {
    cy.intercept(
      "https://api.storyteq.com/v4/content/folders?filter[parent_id]=null&sort=-created_at"
    ).as("waitAfetLoad");
    cy.visit("/");
    cy.visit("https://platform.storyteq.com/builder/#/");
    cy.get(templatePage.templateBanner).should("be.visible");
    cy.get(templatePage.templateBannerTab).click();
    cy.get(templatePage.templateItems).contains("Billboard").click();
    cy.get(templatePage.templateTitleField).type("Template Seda");
    cy.get(templatePage.templateWidth).clear().type("40");
    cy.get(templatePage.templateHeight).clear().type("30");
    cy.get(templatePage.createTemplateBtn).click();
    cy.wait("@waitAfetLoad");
    cy.get(templatePage.dragItem).drag(templatePage.canvas, {
      source: { position: "center" },
      target: { position: "center" },
      force: true,
    });
    cy.get(templatePage.createCircle).click();
    cy.get(templatePage.layer).contains("Ellipse").should("exist");
    cy.get(templatePage.colorFillPick).type("165EDF");
    cy.get(templatePage.shadowCheckbox).click();
    cy.get(templatePage.publishTemplate).click();
    cy.get(templatePage.confirmPublish).contains("Publish").click();
  });

  it("should be able to exit the builder and redirect to templates page", () => {
    cy.visit("/");
    cy.visit("https://platform.storyteq.com/builder/#/");
    cy.get(templatePage.templateBanner).should("be.visible");
    cy.get(templatePage.templateBannerTab).click();
    cy.get(templatePage.templateItems).contains("Billboard").click();
    cy.get(templatePage.templateTitleField).type("New Template");
    cy.get(templatePage.exitTemplateBtn).contains("Exit Builder").click();
    cy.url().should("contain", "/#/content/templates");
  });

  it("should edit the template", () => {
    cy.intercept(
      "https://api.storyteq.com/v4/content/folders?filter[parent_id]=null&sort=-created_at"
    ).as("waitAfetLoad");
    cy.visit("/");
    cy.get(templatePage.sidebarItemTemplate).click();
    cy.get(templatePage.editTemplate).first().invoke("show").click();
    cy.wait("@waitAfetLoad");
    cy.get(templatePage.createText).click();
    cy.get(templatePage.layer).contains("Text").should("exist");
    cy.get(templatePage.sidebarAnimation).click();
    cy.get(templatePage.introAnimation).click();
    cy.get(templatePage.rotateOption).click();
    cy.get(templatePage.introDuration).type("3");
    cy.get(templatePage.outroAnimation).click();
    cy.get(templatePage.scaleOption).click();
    cy.get(templatePage.outroDuration).type("3");
    cy.get(templatePage.publishTemplate).click();
    cy.get(templatePage.confirmPublish).contains("Publish").click();
  });
});
