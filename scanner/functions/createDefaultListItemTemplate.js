function createDefaultListItemTemplate(context) {
  const pickerListItemTag = context.tagFor(PickerListItem);
  return html`<${pickerListItemTag} value="${x => x}" :contentsTemplate="${(x, c) => c.parent.listItemContentsTemplate}"></${pickerListItemTag}>`;
}