  params.forEach(function (str, idx) {
    var command = commands[idx];
    if (/z/i.test(command)) return;

    // Get arguments of each command
    var args = getArgs(str);

    // Different commands have different arguments
    // Here's a quick review
    // M m - x y
    // L l - x y
    // H h - x
    // V v - y
    // A a - rx ry xAxisRotation largeArc sweep x y
    // Q q - x1 y1 x y
    // T t - x y
    // C c - x1 y1 x2 y2 x y
    // S s - x2 y2 x y
    // S/s needs access to the points of previous C/c command
    // T/t needs access to the points of previous Q/q command
    // Here "previous" means right before the target command
    var i, trueBounds, cpx1, cpy1, cpx2, cpy2;

    if (/[ML]/.test(command)) {
      for (i = 0; i < args.length; i += 2) {
        x = args[i];
        y = args[i + 1];
        checkX(x);
        checkY(y);
      }
    } else if (/[ml]/.test(command)) {
      for (i = 0; i < args.length; i += 2) {
        x += args[i];
        y += args[i + 1];
        checkX(x);
        checkY(y);
      }
    } else if (command === 'C') {
      for (i = 0; i < args.length; i += 6) {
        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, args[i], args[i + 1], args[i + 2], args[i + 3], args[i + 4], args[i + 5]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(args[i]);
          checkY(args[i + 1]);
          checkX(args[i + 2]);
          checkY(args[i + 3]);
          checkX(args[i + 4]);
          checkY(args[i + 5]);
        }

        potentialCp = [args[i + 4] * 2 - args[i + 2], args[i + 5] * 2 - args[i + 3]];
        x = args[i + 4];
        y = args[i + 5];
      }
    } else if (command === 'c') {
      for (i = 0; i < args.length; i += 6) {
        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, x + args[i], y + args[i + 1], x + args[i + 2], y + args[i + 3], x + args[i + 4], y + args[i + 5]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(x + args[i + 0]);
          checkY(y + args[i + 1]);
          checkX(x + args[i + 2]);
          checkY(y + args[i + 3]);
          checkX(x + args[i + 4]);
          checkY(y + args[i + 5]);
        }

        potentialCp = [2 * (x + args[i + 4]) - (x + args[i + 2]), 2 * (y + args[i + 5]) - (y + args[i + 3])];
        x += args[i + 4];
        y += args[i + 5];
      }
    } else if (command === 'S') {
      if (shouldReturnTrueBounding) {
        if (/[cs]/i.test(commands[idx - 1])) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, potentialCp[0], potentialCp[1], args[0], args[1], args[2], args[3]);
        } else {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, x, y, args[0], args[1], args[2], args[3]);
        }
        checkX(trueBounds[0]); // MIN_X
        checkX(trueBounds[4]); // MAX_X
        checkY(trueBounds[1]); // MIN_Y
        checkY(trueBounds[5]); // MAX_Y
      } else {
        if (/[cs]/i.test(commands[idx - 1])) {
          checkX(potentialCp[0]);
          checkY(potentialCp[1]);
        }
        checkX(args[0]);
        checkY(args[1]);
        checkX(args[2]);
        checkY(args[3]);
      }

      potentialCp = [2 * args[2] - args[0], 2 * args[3] - args[1]];

      x = args[2];
      y = args[3];

      for (i = 4; i < args.length; i += 4) {
        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, potentialCp[0], potentialCp[1], args[i], args[i + 1], args[i + 2], args[i + 3]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(potentialCp[0]);
          checkY(potentialCp[1]);
          checkX(args[i]);
          checkY(args[i + 1]);
          checkX(args[i + 2]);
          checkY(args[i + 3]);
        }

        potentialCp = [2 * args[i + 2] - args[i], 2 * args[i + 3] - args[i + 1]];
        x = args[i + 2];
        y = args[i + 3];
      }
    } else if (command === 's') {
      if (shouldReturnTrueBounding) {
        if (/[cs]/i.test(commands[idx - 1])) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, potentialCp[0], potentialCp[1], x + args[0], y + args[1], x + args[2], y + args[3]);
        } else {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, x, y, x + args[0], y + args[1], x + args[2], y + args[3]);
        }
        checkX(trueBounds[0]); // MIN_X
        checkX(trueBounds[4]); // MAX_X
        checkY(trueBounds[1]); // MIN_Y
        checkY(trueBounds[5]); // MAX_Y
      } else {
        if (/[cs]/i.test(commands[idx - 1])) {
          checkX(potentialCp[0]);
          checkY(potentialCp[1]);
        }
        checkX(x + args[0]);
        checkY(y + args[1]);
        checkX(x + args[2]);
        checkY(y + args[3]);
      }

      potentialCp = [2 * (x + args[2]) - (x + args[0]), 2 * (y + args[3]) - (y + args[1])];
      x += args[2];
      y += args[3];

      for (i = 4; i < args.length; i += 4) {
        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, potentialCp[0], potentialCp[1], x + args[i], y + args[i + 1], x + args[i + 2], y + args[i + 3]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(potentialCp[0]);
          checkY(potentialCp[1]);
          checkX(x + args[i]);
          checkY(y + args[i + 1]);
          checkX(x + args[i + 2]);
          checkY(y + args[i + 3]);
        }

        potentialCp = [2 * (x + args[i + 2]) - (x + args[i]), 2 * (y + args[i + 3]) - (y + args[i + 1])];
        x += args[i + 2];
        y += args[i + 3];
      }
    } else if (command === 'H') {
      for (i = 0; i < args.length; i++) {
        x = args[i];
        checkX(x);
      }
    } else if (command === 'h') {
      for (i = 0; i < args.length; i++) {
        x += args[i];
        checkX(x);
      }
    } else if (command === 'V') {
      for (i = 0; i < args.length; i++) {
        y = args[i];
        checkY(y);
      }
    } else if (command === 'v') {
      for (i = 0; i < args.length; i++) {
        y += args[i];
        checkY(y);
      }
    } else if (command === 'Q') {
      for (i = 0; i < args.length; i += 4) {
        // convert the one quadratic curve control point to
        // two bezier curve control points using the formula
        // cubicControlX1 = quadraticStartX + 2/3 * (quadraticControlX - quadraticStartX)
        // cubicControlY1 = quadraticStartY + 2/3 * (quadraticControlY - quadraticStartY)
        // cubicControlX2 = quadraticEndX + 2/3 * (quadraticControlX - quadraticEndX)
        // cubicControlY2 = quadraticEndY + 2/3 * (quadraticControlY - quadraticEndY)

        cpx1 = x + 2 / 3 * (args[i] - x);
        cpy1 = y + 2 / 3 * (args[i + 1] - y);
        cpx2 = args[i + 2] + 2 / 3 * (args[i] - args[i + 2]);
        cpy2 = args[i + 3] + 2 / 3 * (args[i + 1] - args[i + 3]);

        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, cpx1, cpy1, cpx2, cpy2, args[i + 2], args[i + 3]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(cpx1);
          checkY(cpy1);
          checkX(cpx2);
          checkY(cpy2);
          checkX(args[i + 2]);
          checkY(args[i + 3]);
        }

        potentialCp = [2 * args[i + 2] - args[i], 2 * args[i + 3] - args[i + 1]];
        x = args[i + 2];
        y = args[i + 3];
      }
    } else if (command === 'q') {
      for (i = 0; i < args.length; i += 4) {
        cpx1 = x + 2 / 3 * args[i];
        cpy1 = y + 2 / 3 * args[i + 1];
        cpx2 = x + args[i + 2] + 2 / 3 * (args[i] - args[i + 2]);
        cpy2 = y + args[i + 3] + 2 / 3 * (args[i + 1] - args[i + 3]);

        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, cpx1, cpy1, cpx2, cpy2, x + args[i + 2], y + args[i + 3]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(cpx1);
          checkY(cpy1);
          checkX(cpx2);
          checkY(cpy2);
          checkX(x + args[i + 2]);
          checkY(y + args[i + 3]);
        }

        potentialCp = [2 * (x + args[i + 2]) - (x + args[i]), 2 * (y + args[i + 3]) - (y + args[i + 1])];
        x += args[i + 2];
        y += args[i + 3];
      }
    } else if (command === 'T') {
      if (/[qt]/i.test(commands[idx - 1])) {
        cpx1 = x + 2 / 3 * (potentialCp[0] - x);
        cpy1 = y + 2 / 3 * (potentialCp[1] - y);
        cpx2 = args[0] + 2 / 3 * (potentialCp[0] - args[0]);
        cpy2 = args[1] + 2 / 3 * (potentialCp[1] - args[1]);

        potentialCp = [2 * args[0] - potentialCp[0], 2 * args[1] - potentialCp[1]];
      } else {
        cpx1 = x;
        cpy1 = y;
        cpx2 = args[0] + 2 / 3 * (x - args[0]);
        cpy2 = args[1] + 2 / 3 * (y - args[1]);

        potentialCp = [2 * args[0] - x, 2 * args[1] - y];
      }

      if (shouldReturnTrueBounding) {
        trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, cpx1, cpy1, cpx2, cpy2, args[0], args[1]);
        checkX(trueBounds[0]); // MIN_X
        checkX(trueBounds[4]); // MAX_X
        checkY(trueBounds[1]); // MIN_Y
        checkY(trueBounds[5]); // MAX_Y
      } else {
        checkX(cpx1);
        checkY(cpy1);
        checkX(cpx2);
        checkY(cpy2);
        checkX(args[0]);
        checkY(args[1]);
      }

      x = args[0];
      y = args[1];

      for (i = 2; i < args.length; i += 2) {
        cpx1 = x + 2 / 3 * (potentialCp[0] - x);
        cpy1 = y + 2 / 3 * (potentialCp[1] - y);
        cpx2 = args[i] + 2 / 3 * (potentialCp[0] - args[i]);
        cpy2 = args[i + 1] + 2 / 3 * (potentialCp[1] - args[i + 1]);

        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, cpx1, cpy1, cpx2, cpy2, args[i], args[i + 1]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(cpx1);
          checkY(cpy1);
          checkX(cpx2);
          checkY(cpy2);
          checkX(args[i]);
          checkY(args[i + 1]);
        }

        potentialCp = [2 * args[i] - potentialCp[0], 2 * args[i + 1] - potentialCp[1]];
        x = args[i];
        y = args[i + 1];
      }
    } else if (command === 't') {
      if (/[qt]/i.test(commands[idx - 1])) {
        cpx1 = x + 2 / 3 * (potentialCp[0] - x);
        cpy1 = y + 2 / 3 * (potentialCp[1] - y);
        cpx2 = x + args[0] + 2 / 3 * (potentialCp[0] - x - args[0]);
        cpy2 = y + args[1] + 2 / 3 * (potentialCp[1] - y - args[1]);

        potentialCp = [2 * (x + args[0]) - potentialCp[0], 2 * (y + args[1]) - potentialCp[1]];
      } else {
        cpx1 = x;
        cpy1 = y;
        cpx2 = x + args[0] - 2 / 3 * args[0];
        cpy2 = y + args[1] - 2 / 3 * args[1];

        potentialCp = [2 * (x + args[0]) - x, 2 * (y + args[1]) - y];
      }

      if (shouldReturnTrueBounding) {
        trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, cpx1, cpy1, cpx2, cpy2, x + args[0], y + args[1]);
        checkX(trueBounds[0]); // MIN_X
        checkX(trueBounds[4]); // MAX_X
        checkY(trueBounds[1]); // MIN_Y
        checkY(trueBounds[5]); // MAX_Y
      } else {
        checkX(cpx1);
        checkY(cpy1);
        checkX(cpx2);
        checkY(cpy2);
        checkX(x + args[0]);
        checkY(y + args[1]);
      }

      x += args[0];
      y += args[1];

      for (i = 2; i < args.length; i += 2) {
        cpx1 = x + 2 / 3 * (potentialCp[0] - x);
        cpy1 = y + 2 / 3 * (potentialCp[1] - y);
        cpx2 = x + args[i] + 2 / 3 * (potentialCp[0] - x - args[i]);
        cpy2 = y + args[i + 1] + 2 / 3 * (potentialCp[1] - y - args[i + 1]);

        if (shouldReturnTrueBounding) {
          trueBounds = curve_bounding.calculate(curve_bounding.Mode.STANDARD, x, y, cpx1, cpy1, cpx2, cpy2, x + args[i], y + args[i + 1]);
          checkX(trueBounds[0]); // MIN_X
          checkX(trueBounds[4]); // MAX_X
          checkY(trueBounds[1]); // MIN_Y
          checkY(trueBounds[5]); // MAX_Y
        } else {
          checkX(cpx1);
          checkY(cpy1);
          checkX(cpx2);
          checkY(cpy2);
          checkX(x + args[i]);
          checkY(y + args[i + 1]);
        }

        potentialCp = [2 * (x + args[i]) - potentialCp[0], 2 * (y + args[i + 1]) - potentialCp[1]];
        x += args[i];
        y += args[i + 1];
      }
    } else if (command === 'A') {
      for (var i = 0; i < args.length; i += 7) {
        x = args[i + 5];
        y = args[i + 6];
        checkX(x);
        checkY(y);
      }
    } else if (command === 'a') {
      for (var i = 0; i < args.length; i += 7) {
        x += args[i + 5];
        y += args[i + 6];
        checkX(x);
        checkY(y);
      }
    }
  });