function bezierCurveTo(x1, y1, x2, y2, x, y) {
      cmds.push({
        cmd: "bezierCurveTo",
        args: [x1, y1, x2, y2, x, y]
      });
    }