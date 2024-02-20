function generatorText({
  selected,
  InsertGetter,
  selectedGetter = (selected) => selected,
  ignoreEmptyLine = true,
}) {
  let insertContent;
  let newSelected;

  if (selected) {
    newSelected = selectedGetter(selected);
    insertContent = InsertGetter(selected, 1);

    // 如果当前选中的文本包含换行 则插入后选中插入的所有文本
    if (selected.indexOf('\n') !== -1) {
      insertContent = selected
        .split('\n')
        .map((rowText, index) => {
          const isEmptyLine = !rowText;
          if (ignoreEmptyLine && isEmptyLine) return '';

          return InsertGetter(rowText, index + 1).replace(selectedGetter(null), '');
        })
        .join('\n');

      newSelected = insertContent;
    }
  } else {
    insertContent = InsertGetter(null, 1);
    newSelected = selectedGetter(selected);
  }

  return {
    insertContent,
    newSelected,
  };
}