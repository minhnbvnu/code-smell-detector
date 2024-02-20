function eventPosRelativeTo(ev, element) {
    let b = element.getBoundingClientRect();
    return new Point(ev.clientX - b.left, ev.clientY - b.top);
}