function make_contact_group() {
    // Matter.js uses negative numbers for non-colliding
    // groups, so we negate them everywhere to make it more
    // intuitive for the user.
    return -$Physics.Body.nextGroup(true);
}