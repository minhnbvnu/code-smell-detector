function HarView()
{
    this.id = "harView";

    // Location of the model (all tabs see its parent and so the model).
    this.model = new HarModel();

    // Append tabs
    this.appendTab(new HomeTab());
    this.appendTab(new PreviewTab(this.model));
    this.appendTab(new DomTab());
    this.appendTab(new AboutTab());
    this.appendTab(new SchemaTab());
}