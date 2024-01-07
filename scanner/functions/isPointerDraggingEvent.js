function isPointerDraggingEvent(mapBrowserEvent) {
  const type = mapBrowserEvent.type;
  return (
    type === MapBrowserEventType.POINTERDOWN ||
    type === MapBrowserEventType.POINTERDRAG ||
    type === MapBrowserEventType.POINTERUP
  );
}