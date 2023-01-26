/** @format */

export const templatePage = {
  breadcrumbTemplate: '[class="el-breadcrumb__inner"] [href="#/content/templates"]',
  templateBanner: ".size-header",
  templateBannerTab: "#tab-banner",
  templateItems: "#size-presets .size-card",
  templateTitleField: '[placeholder="Untitled Template"]',
  createTemplateBtn: '[data-cy="createTemplate"]',
  createRectangle: '[data-cy="createRectangle"]',
  layer: '[data-cy="layerLabel"]',
  horizontalAlign: "#align-center-horizontal > #small-rectangle",
  verticalAlign: "#align-center-vertical > #small-rectangle",
  strokeCheckbox: '[data-cy="strokeCheckbox"]',
  publishTemplate: "#publish-template-toggle",
  confirmPublish: ".el-dialog > .el-dialog__footer > .dialog-footer > .el-button--primary",
  templateCard: (title) => `[data-cy="templateCard"] [title=${title}]`,
};
