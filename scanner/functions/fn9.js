function fn9() {

    let info = ''
    function* g1() {
        info += '1'
        yield* g2()
        info += '5'
    }
    function* g2() {
        info += '2'
        yield* g3()
        info += '4'
    }
    function* g3() {
        info += '3'
    }

    var g = g1()
    g.next()
    console.log(info)  // 12345

}