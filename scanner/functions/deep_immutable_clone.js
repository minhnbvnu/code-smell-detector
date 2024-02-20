function deep_immutable_clone(a) {
    return $deep_clone(a, new Map(), false, true);    
}