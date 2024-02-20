function printErrorsAndWarnings(element) {
    const {
      errorCount,
      warningCount
    } = store.getErrorAndWarningCountForElementID(element.id);

    if (errorCount === 0 && warningCount === 0) {
      return '';
    }

    return ` ${errorCount > 0 ? '✕' : ''}${warningCount > 0 ? '⚠' : ''}`;
  }