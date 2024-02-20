function computeAndPaintOp(canvas, opGetter, button) {
        button.disabled = true;
        let painter = new Painter(canvas);
        painter.clear();
        let d = Math.min((canvas.width - 5)/2, canvas.height);
        let rect1 = new Rect(0, 0, d, d);
        let rect2 = new Rect(d + 5, 0, d, d);
        try {
            let op = opGetter();
            MathPainter.paintMatrix(
                painter,
                op,
                rect1,
                Config.OPERATION_FORE_COLOR,
                'black',
                undefined,
                Config.OPERATION_BACK_COLOR,
                undefined,
                'transparent');
            if (!op.isUnitary(0.009)) {
                painter.printParagraph('NOT UNITARY', rect2, new Point(0.5, 0.5), 'red', 24);
            } else  if (op.width() !== 2) {
                painter.printParagraph('(Not a 1-qubit rotation)', rect2, new Point(0.5, 0.5), '#666', 20);
            } else {
                MathPainter.paintBlochSphereRotation(
                    painter,
                    op,
                    rect2,
                    Config.OPERATION_BACK_COLOR,
                    Config.OPERATION_FORE_COLOR);
            }
            let cx = (rect1.right() + rect2.x)/2;
            painter.strokeLine(new Point(cx, 0), new Point(cx, canvas.height), 'black', 2);
            if (!op.hasNaN()) {
                button.disabled = false;
            }
        } catch (ex) {
            painter.printParagraph(
                ex+"",
                new Rect(0, 0, canvas.width, canvas.height),
                new Point(0.5, 0.5),
                'red',
                24);
        }
    }