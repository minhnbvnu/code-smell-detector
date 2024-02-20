function Tracker(handle, callbacks)
{
    this.element = handle;
    this.handle = handle;
    this.callbacks = callbacks;

    this.cursorStartPos = null;
    this.cursorLastPos = null;
    //this.elementStartPos = null;
    this.dragging = false;

    // Start listening
    this.onDragStart = Obj.bind(this.onDragStart, this);
    this.onDragOver = Obj.bind(this.onDragOver, this);
    this.onDrop = Obj.bind(this.onDrop, this);

    Events.addEventListener(this.element, "mousedown", this.onDragStart, false);
    this.active = true;
}