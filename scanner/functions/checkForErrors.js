function checkForErrors () {
	const errors = document.getElementById('errors');
	errors.style.display = 'none';

	while (errors.hasChildNodes())
		errors.lastChild.remove();

  let count = 0;

	const errorListener = {
		observe: (message) => {
      if (!count)
        errors.style.display = 'block';

      const error = message.QueryInterface(Ci.nsIScriptError);
      const errMsg = error.lineNumber + ':' + error.columnNumber + ' - ' + error.errorMessage;

      const label = document.createElement('label');
      label.appendChild(document.createTextNode(errMsg));
      label.addEventListener('click', function () {
        goToLine(error.lineNumber, error.columnNumber);
      });
      errors.appendChild(label);
      errors.appendChild(document.createElement('br'));
      count++;

      if (count == 10) {
        errors.appendChild(document.createTextNode('...'));
        Services.console.unregisterListener(this);
      }
		}
	}

  Services.console.registerListener(errorListener);

  const styleEl = document.createElement('style');
  styleEl.appendChild(document.createTextNode(codeElementWrapper.value));
  document.documentElement.appendChild(styleEl);
  styleEl.remove();

  setTimeout(() => {
    if (count < 10)
      Services.console.unregisterListener(errorListener);
  });

	toggleUI('check-for-errors-button', false);
  sourceEditor.focus();
}