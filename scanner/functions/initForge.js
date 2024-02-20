function initForge(revision, obsIsAnyOverlayShowing) {
    const obsOnShown = obsForgeIsShowing.filter(e => e === true);
    /** @type {!String} */
    let latestInspectorText;
    revision.latestActiveCommit().subscribe(e => { latestInspectorText = e; });

    // Show/hide forge overlay.
    (() => {
        const forgeButton = /** @type {!HTMLButtonElement} */ document.getElementById('gate-forge-button');
        const forgeOverlay = /** @type {!HTMLDivElement} */ document.getElementById('gate-forge-overlay');
        const forgeDiv = /** @type {HTMLDivElement} */ document.getElementById('gate-forge-div');
        forgeButton.addEventListener('click', () => forgeIsVisible.set(true));
        forgeOverlay.addEventListener('click', () => forgeIsVisible.set(false));
        obsIsAnyOverlayShowing.subscribe(e => { forgeButton.disabled = e; });
        document.addEventListener('keydown', e => {
            const ESC_KEY = 27;
            if (e.keyCode === ESC_KEY) {
                forgeIsVisible.set(false)
            }
        });
        obsForgeIsShowing.subscribe(showing => {
            forgeDiv.style.display = showing ? 'block' : 'none';
            if (showing) {
                document.getElementById('gate-forge-rotation-axis').focus();
            }
        });
    })();

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

    /**
     * @param {!Gate} gate
     * @param {undefined|!CircuitDefinition=undefined} circuitDef
     */
    function createCustomGateAndClose(gate, circuitDef=undefined) {
        let c = circuitDef || fromJsonText_CircuitDefinition(latestInspectorText);
        revision.commit(JSON.stringify(Serializer.toJson(c.withCustomGate(gate)), null, 0));
        forgeIsVisible.set(false);
    }

    (() => {
        const rotationCanvas = /** @type {!HTMLCanvasElement} */ document.getElementById('gate-forge-rotation-canvas');
        const rotationButton = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-rotation-button');
        const txtAxis = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-rotation-axis');
        const txtAngle = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-rotation-angle');
        const txtPhase = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-rotation-phase');
        const txtName = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-rotation-name');
        obsOnShown.subscribe(() => { txtName.value = ""; });

        function parseRotationFromInputs() {
            return parseUserRotation(
                valueElsePlaceholder(txtAngle),
                valueElsePlaceholder(txtPhase),
                valueElsePlaceholder(txtAxis));
        }

        let redraw = () => computeAndPaintOp(rotationCanvas, parseRotationFromInputs, rotationButton);
        Observable.of(obsOnShown, ...[txtPhase, txtAxis, txtAngle].map(textEditObservable)).
            flatten().
            throttleLatest(100).
            subscribe(redraw);

        rotationButton.addEventListener('click', () => {
            let mat;
            try {
                mat = parseRotationFromInputs();
            } catch (ex) {
                console.warn(ex);
                return; // Button is about to be disabled, so no handling required.
            }

            let gate = new GateBuilder().
                setSerializedId('~' + Math.floor(Math.random()*(1 << 20)).toString(32)).
                setSymbol(txtName.value).
                setTitle('Custom Rotation Gate').
                setKnownEffectToMatrix(mat).
                gate;
            createCustomGateAndClose(gate);
        });
    })();

    (() => {
        const matrixCanvas = /** @type {!HTMLCanvasElement} */ document.getElementById('gate-forge-matrix-canvas');
        const txtMatrix = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-matrix');
        const chkFix = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-matrix-fix');
        const matrixButton = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-matrix-button');
        const txtName = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-matrix-name');
        obsOnShown.subscribe(() => { txtName.value = ""; });

        function parseMatrixFromInputs() {
            let text = valueElsePlaceholder(txtMatrix);
            let ensureUnitary = chkFix.checked;
            return parseUserMatrix(text, ensureUnitary);
        }

        let redraw = () => computeAndPaintOp(matrixCanvas, parseMatrixFromInputs, matrixButton);

        Observable.of(obsOnShown, textEditObservable(txtMatrix), Observable.elementEvent(chkFix, 'change')).
            flatten().
            throttleLatest(100).
            subscribe(redraw);

        matrixButton.addEventListener('click', () => {
            let mat;
            try {
                mat = parseMatrixFromInputs();
            } catch (ex) {
                console.warn(ex);
                return; // Button is about to be disabled, so no handling required.
            }

            let name = txtName.value.trim();
            let h = Math.round(Math.log2(mat.height()));
            let gate = new GateBuilder().
                setSerializedId('~' + Math.floor(Math.random()*(1 << 20)).toString(32)).
                setSymbol(name).
                setTitle('Custom Matrix Gate').
                setHeight(h).
                setWidth(name === '' ? h : 1).
                setKnownEffectToMatrix(mat).
                gate;
            createCustomGateAndClose(gate);
        });
    })();

    (() => {
        const circuitCanvas = /** @type {!HTMLCanvasElement} */ document.getElementById('gate-forge-circuit-canvas');
        const txtCols = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-circuit-cols');
        const txtRows = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-circuit-rows');
        const spanInputs = /** @type {!HTMLElement} */ document.getElementById('gate-forge-circuit-inputs');
        const spanWeight = /** @type {!HTMLElement} */ document.getElementById('gate-forge-circuit-weight');
        const circuitButton = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-circuit-button');
        const txtName = /** @type {!HTMLInputElement} */ document.getElementById('gate-forge-circuit-name');
        obsOnShown.subscribe(() => { txtName.value = ""; });

        /** @returns {{gate: !Gate, circuit: !CircuitDefinition}} */
        function parseEnteredCircuitGate() {
            let circuit = fromJsonText_CircuitDefinition(latestInspectorText);
            let gate = parseUserGateFromCircuitRange(
                circuit,
                valueElsePlaceholder(txtCols),
                valueElsePlaceholder(txtRows),
                txtName.value.trim());
            return {gate, circuit};
        }

        let latestGate = new ObservableValue(undefined);
        let drawGate = (painter, gate) => drawCircuitTooltip(
            painter,
            gate.knownCircuitNested,
            new Rect(0, 0, circuitCanvas.width, circuitCanvas.height),
            true,
            getCircuitCycleTime());

        latestGate.observable().
            zipLatest(obsForgeIsShowing, (g, s) => s ? g : undefined).
            map(e => e === undefined || e.gate.stableDuration() === Infinity ?
                Observable.of() :
                Observable.requestAnimationTicker().map(_ => e)).
            flattenLatest().
            subscribe(e => {
                let painter = new Painter(circuitCanvas);
                painter.clear();
                drawGate(painter, e.gate);
            });

        let redraw = () => {
            circuitButton.disabled = true;
            let painter = new Painter(circuitCanvas);
            painter.clear();
            try {
                let {gate} = parseEnteredCircuitGate();
                let keys = gate.getUnmetContextKeys();
                spanInputs.innerText = keys.size === 0 ?
                    "(none)" :
                    [...keys].map(e => e.replace("Input Range ", "").
                                         replace("Input NO_DEFAULT Range ", "")).join(", ");
                spanWeight.innerText = "" + gate.knownCircuit.gateWeight();
                drawGate(painter, gate);
                circuitButton.disabled = false;
                latestGate.set({gate});
            } catch (ex) {
                latestGate.set(undefined);
                spanInputs.innerText = "(err)";
                spanWeight.innerText = "(err)";
                painter.printParagraph(
                    ex+"",
                    new Rect(0, 0, circuitCanvas.width, circuitCanvas.height),
                    new Point(0.5, 0.5),
                    'red',
                    24);
            }
        };

        Observable.of(obsOnShown, textEditObservable(txtCols), textEditObservable(txtRows)).
            flatten().
            throttleLatest(100).
            subscribe(redraw);

        circuitButton.addEventListener('click', () => {
            try {
                let {gate, circuit} = parseEnteredCircuitGate();
                createCustomGateAndClose(gate, circuit);
            } catch (ex) {
                // Button is about to be disabled, so no handling required.
                console.warn(ex);
            }
        });
    })();
}