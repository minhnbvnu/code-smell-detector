function PreviewTab(model)
{
    this.model = model;

    this.toolbar = new Toolbar();
    this.timeline = new Timeline();
    this.stats = new Stats(model, this.timeline);

    // Initialize toolbar.
    this.toolbar.addButtons(this.getToolbarButtons());

    // Context menu listener.
    ValidationError.addListener(this);
}