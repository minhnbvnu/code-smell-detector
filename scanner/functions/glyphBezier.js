function glyphBezier(glyph, upem, typeOfOutline, pointSize) {
    let ps = pointSize
    let offsetX = (upem - glyph.advanceWidth) * 0.5
    let path2d = new Path2D()

    if (typeOfOutline == "outline") {
        let commandString = ""
        glyph.path.commands.forEach((command) => {
            switch (command.type) {
                case "M":
                    commandString += `${command.type} `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "L":
                    commandString += `${command.type} `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "C":
                    commandString += `${command.type} `
                    commandString += `${command.x1 + offsetX} ${upem - command.y1}, `
                    commandString += `${command.x2 + offsetX} ${upem - command.y2}, `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "Q":
                    commandString += `${command.type} `
                    commandString += `${command.x1 + offsetX} ${upem - command.y1}, `
                    commandString += `${command.x + offsetX} ${upem - command.y} `
                    break
                case "Z":
                    commandString += `${command.type} `
                    break
            }
        })
        path2d.addPath(new Path2D(commandString))
    }

    if (typeOfOutline == "points") {
        glyph.path.commands.forEach((command) => {
            let p = new Path2D()
            const x = command.x + offsetX
            const y = upem - command.y
            switch (command.type) {
                case "M":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
                case "L":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
                case "C":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
                case "Q":
                    p.rect(x - ps * 0.5, y - ps * 0.5, ps, ps)
                    break
            }
            path2d.addPath(p)
        })
    }

    if (typeOfOutline == "handles") {
        let p = new Path2D()
        glyph.path.commands.forEach((command) => {
            switch (command.type) {
                case "M":
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
                case "L":
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
                case "C":
                    p.lineTo(command.x1 + offsetX, upem - command.y1)
                    p.moveTo(command.x + offsetX, upem - command.y)
                    p.lineTo(command.x2 + offsetX, upem - command.y2)
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
                case "Q":
                    p.lineTo(command.x1 + offsetX, upem - command.y1)
                    p.moveTo(command.x1 + offsetX, upem - command.y1)
                    p.lineTo(command.x + offsetX, upem - command.y)
                    break
                case "Z":
                    p.moveTo(command.x + offsetX, upem - command.y)
                    break
            }
        })
        path2d.addPath(p)
    }

    if (typeOfOutline == "handle points") {
        glyph.path.commands.forEach((command) => {
            let p = new Path2D()
            const x1 = command.x1 + offsetX
            const x2 = command.x2 + offsetX
            const y1 = upem - command.y1
            const y2 = upem - command.y2
            switch (command.type) {
                case "C":
                    p.rect(x1 - ps * 0.5, y1 - ps * 0.5, ps, ps)
                    p.rect(x2 - ps * 0.5, y2 - ps * 0.5, ps, ps)
                    break
                case "Q":
                    p.rect(x1 - ps * 0.5, y1 - ps * 0.5, ps, ps)
                    break
            }
            path2d.addPath(p)
        })
    }

    return path2d
}