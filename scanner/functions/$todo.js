function $todo(msg) {
    if (msg === undefined) {
        $error("Unimplemented");
    } else {
        $error("Unimplemented: " + $unparse(msg));
    }
}