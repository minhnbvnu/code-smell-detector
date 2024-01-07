function quadraticCurveTo(xa, ya, x, y) {
      cmds.push({
        cmd: "quadraticCurveTo",
        args: [xa, ya, x, y]
      });
    }