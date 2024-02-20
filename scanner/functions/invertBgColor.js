function invertBgColor(color, opacity = 0.9) {
        if (!color || typeof color == "undefined"){
            return
        }
        let reg = /rgba?\((.+?),(.+?),(.+?)(?:,(.+?))?\)/
        let gamma = 1
        let [r, g, b, a] = color.match(reg).slice(1).map(Number)
        let rNum = (255 ** gamma - r ** gamma) * opacity + (r ** gamma) * (1 - opacity)
        let gNum = (255 ** gamma - g ** gamma) * opacity + (g ** gamma) * (1 - opacity)
        let bNum = (255 ** gamma - b ** gamma) * opacity + (b ** gamma) * (1 - opacity)

        let invertedR = ~~(rNum ** (1 / gamma))
        let invertedG = ~~(gNum ** (1 / gamma))
        let invertedB = ~~(bNum ** (1 / gamma))
        let newColor = `rgba(${ invertedR }, ${ invertedG }, ${ invertedB }, ${ a || opacity})`
        return newColor
    }