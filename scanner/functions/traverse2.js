function traverse2(e, f) {
    f(e);                             // Invoke f() on e
    let child = e.firstElementChild;  // Iterate the children linked-list style
    while(child !== null) {
        traverse2(child, f);          // And recurse
        child = child.nextElementSibling;
    }
}