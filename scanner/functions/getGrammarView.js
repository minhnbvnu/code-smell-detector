async function getGrammarView(editor) {
  atom.commands.dispatch(editor.getElement(), 'grammar-selector:show');
  await SelectListView.getScheduler().getNextUpdatePromise();
  return atom.workspace.getModalPanels()[0].getItem();
}