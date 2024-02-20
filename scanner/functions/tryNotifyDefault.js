function tryNotifyDefault() {
      if (defaultMessage) {
        vscode.window.showWarningMessage(defaultMessage)
      }
    }