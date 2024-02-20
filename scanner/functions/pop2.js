function pop2(currentState, stack) {
    stack.splice(0, 3);
    return stack.shift() || "start";
}