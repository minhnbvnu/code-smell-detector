function* Hello() {
        yield 100
        yield (function () {return 200})()
        return 300 
    }