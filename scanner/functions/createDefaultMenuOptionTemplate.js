function createDefaultMenuOptionTemplate(context) {
  const pickerMenuOptionTag = context.tagFor(PickerMenuOption);
  return html`<${pickerMenuOptionTag} value="${x => x}" :contentsTemplate="${(x, c) => c.parent.menuOptionContentsTemplate}"></${pickerMenuOptionTag}>`;
}