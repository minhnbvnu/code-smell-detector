function webViewerPageMode({
  mode
}) {
  let view;

  switch (mode) {
    case "thumbs":
      view = _pdf_sidebar.SidebarView.THUMBS;
      break;

    case "bookmarks":
    case "outline":
      view = _pdf_sidebar.SidebarView.OUTLINE;
      break;

    case "attachments":
      view = _pdf_sidebar.SidebarView.ATTACHMENTS;
      break;

    case "none":
      view = _pdf_sidebar.SidebarView.NONE;
      break;

    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }

  PDFViewerApplication.pdfSidebar.switchView(view, true);
}