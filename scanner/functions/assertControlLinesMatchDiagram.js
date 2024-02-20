function assertControlLinesMatchDiagram(diagram, ...extraGates) {
    let lines = diagram.split('\n');
    let indentation = lines[2].search(/\S/);
    let c = circuit(seq(lines).stride(2).join('\n'), ...extraGates);
    let controlLines = seq(lines).
        skip(1).
        stride(2).
        map(e => e.substring(indentation)).
        map(e => seq(e).
            map(c => c === '┃' ? 3 :
                     c === '║' ? 2 :
                     c === '|' || c === '│' ? 1 :
                     0).
            padded(c.columns.length, 0).
            toArray()).
        toArray();

    for (let col = 0; col < c.columns.length; col++) {
        let diagramColControlLines = new Array(c.numWires - 1).fill(0);
        for (let {first, last, measured} of c.controlLinesRanges(col)) {
            for (let i = first; i < last; i++) {
                diagramColControlLines[i] |= measured ? 2 : 1;
            }
        }

        for (let row = 0; row < c.numWires - 1; row++) {
            assertThat(controlLines[row][col]).
                withInfo({col, row, diagram}).
                isEqualTo(diagramColControlLines[row]);
        }
    }
}