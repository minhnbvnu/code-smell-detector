function validateDocumentSettings(settings) {
  if (isTrue(settings.include_resizer_classes)) {
    error("The include_resizer_classes option was removed. Please file a GitHub issue if you need this feature.");
  }

  if (!(settings.responsiveness == 'fixed' || settings.responsiveness == 'dynamic')) {
    warn('Unsupported "responsiveness" setting: ' + (settings.responsiveness || '[]'));
  }
}