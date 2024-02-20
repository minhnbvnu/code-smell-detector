function createSurfaceEvent (surface, eventData) {
  return new DOMEvent(Object.assign({ target: surface.getNativeElement() }, eventData))
}