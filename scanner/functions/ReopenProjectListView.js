constructor(callback) {
    this.callback = callback;
    this.selectListView = new SelectListView({
      emptyMessage: 'No projects in history.',
      itemsClassList: ['mark-active'],
      items: [],
      filterKeyForItem: project => project.name,
      elementForItem: project => {
        let element = document.createElement('li');
        if (project.name === this.currentProjectName) {
          element.classList.add('active');
        }
        element.textContent = project.name;
        return element;
      },
      didConfirmSelection: project => {
        this.cancel();
        this.callback(project.value);
      },
      didCancelSelection: () => {
        this.cancel();
      }
    });
    this.selectListView.element.classList.add('reopen-project');
  }