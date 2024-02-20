function SidebarEventInfo_SidebarEventInfo(_) {
  const {
    selectedEvent
  } = Object(react["useContext"])(TimelineContext); // (TODO) Refactor in next PR so this supports multiple types of events

  if (selectedEvent && selectedEvent.schedulingEvent) {
    return /*#__PURE__*/react["createElement"](SchedulingEventInfo, {
      eventInfo: selectedEvent.schedulingEvent
    });
  }

  return null;
}