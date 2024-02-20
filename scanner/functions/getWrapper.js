function getWrapper(javaobject) {
    return Java.cast(javaobject, Java.use(javaobject.$className))
}