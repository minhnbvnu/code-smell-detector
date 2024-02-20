function DomTab()
{
    this.toolbar = new Toolbar();
    this.toolbar.addButtons(this.getToolbarButtons());

    // Display jsonQuery results as a tree by default.
    this.tableView = false;
}