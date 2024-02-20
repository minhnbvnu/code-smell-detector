function createCopyCodePlugin() {
  return {
    install(VMdEditor) {
      VMdEditor.extendMarkdown((mdParser) => {
        mdParser.use(markdownItCopyCode);
      });

      VMdEditor.use(createCopyCodePreview());
    },
  };
}