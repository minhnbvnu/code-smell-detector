function EventTarget() {
  // Support both EventTarget and EventTarget(...)
  // as a super class, just like the original module does.
  if (arguments.length > 0) {
    return EventTarget;
  }
}