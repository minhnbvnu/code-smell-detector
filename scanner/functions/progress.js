function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}