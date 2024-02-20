function diffUsingJS(from_text, to_text, from_header, to_header, output_div) {
    var base = difflib.stringAsLines(from_text);
    var newtxt = difflib.stringAsLines(to_text);
    var sm = new difflib.SequenceMatcher(base, newtxt);
    var opcodes = sm.get_opcodes();
    $(output_div).empty()
        .append(diffview.buildView({
            baseTextLines:base,
            newTextLines:newtxt,
            opcodes:opcodes,
            baseTextName:from_header,
            newTextName:to_header,
            viewType:0}));
}