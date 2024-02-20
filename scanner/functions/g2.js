function* g2() {
        info += '2'
        yield* g3()
        info += '4'
    }