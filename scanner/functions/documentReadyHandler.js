function documentReadyHandler()
{
  document.removeEventListener("DOMContentLoaded", documentReadyHandler, false);
  window.removeEventListener("load", documentReadyHandler, false);
  
  pickDocumentDataTargets();
  tieTooltips();
}