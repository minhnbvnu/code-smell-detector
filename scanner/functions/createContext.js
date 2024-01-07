function createContext() {
    if (isDebugging()) return new Context();
}