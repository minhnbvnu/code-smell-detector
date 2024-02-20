function _createInitialCheckboxDisplay(displayEl, data) {
  displayEl.innerHTML = '';
  displayEl.style.overflowX = 'auto';
  displayEl.setAttribute('aria-hidden', true);

  data.forEach(rowData => {
    const rowEl = document.createElement('div');
    rowEl.style.lineHeight = 0.75;
    rowEl.style.whiteSpace = 'nowrap';

    rowData.forEach(cellData => {
      const checkboxEl = document.createElement('input');
      const indeterminateVal = cellData === 2 ? true : false;
      const checkedVal = indeterminateVal ? false : Boolean(cellData);

      checkboxEl.style.margin = 0;
      checkboxEl.style.verticalAlign = 'top';
      checkboxEl.type = 'checkbox';
      checkboxEl.tabIndex = '-1';
      checkboxEl.checked = checkedVal;
      checkboxEl.indeterminate = indeterminateVal;

      rowEl.appendChild(checkboxEl);
    });

    displayEl.appendChild(rowEl);
  });
}