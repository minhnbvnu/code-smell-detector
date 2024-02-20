function getNextSelectMultipleValue(e) {
      return Array.from(e.target.options).reduce(
        (values, option) =>
          option.selected ? [...values, option.value] : values,
        [],
      );
    }