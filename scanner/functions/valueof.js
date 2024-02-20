function valueof(input) {
  switch (input.type) {
    case "range":
    case "number": return input.valueAsNumber;
    case "date": return input.valueAsDate;
    case "checkbox": return input.checked;
    case "file": return input.multiple ? input.files : input.files[0];
    case "select-multiple": return Array.from(input.selectedOptions, o => o.value);
    default: return input.value;
  }
}