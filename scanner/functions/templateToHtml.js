function templateToHtml(context) {
  if (context.mdTemplate === "intro") {
    generate_versions(context);
  }

  let introHtmlTemplate = md2html(context.mdTemplate);
  let introTemplate = Handlebars.compile(introHtmlTemplate);
  let infoHtml = introTemplate(context);
  let html = marked.parse(infoHtml);
  return html;
}