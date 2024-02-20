function get_editor_headers(editor_instance, save, edition_btn) {
    var save_html = `<div class="btn btn-sm btn-light mr-1 " title="CTRL-S" id="last_saved" onclick="${save}( this );"><i class="fa-solid fa-file-circle-check"></i></div>`;
    if (save === undefined || save === null) {
        save_html = '';
    }
    header = `
                ${save_html}
                <div class="btn btn-sm btn-light mr-1 " title="CTRL-B" onclick="${editor_instance}.insertSnippet`+"('**${1:$SELECTION}**');"+`${editor_instance}.focus();"><i class="fa-solid fa-bold"></i></div>
                <div class="btn btn-sm btn-light mr-1" title="CTRL-I" onclick="${editor_instance}.insertSnippet`+"('*${1:$SELECTION}*');"+`${editor_instance}.focus();"><i class="fa-solid fa-italic"></i></div>
                <div class="btn btn-sm btn-light mr-1" title="CTRL-SHIFT-1" onclick="${editor_instance}.insertSnippet`+"('# ${1:$SELECTION}');"+`${editor_instance}.focus();">H1</div>
                <div class="btn btn-sm btn-light mr-1" title="CTRL-SHIFT-2" onclick="${editor_instance}.insertSnippet`+"('## ${1:$SELECTION}')"+`;${editor_instance}.focus();">H2</div>
                <div class="btn btn-sm btn-light mr-1" title="CTRL-SHIFT-3" onclick="${editor_instance}.insertSnippet`+"('### ${1:$SELECTION}');"+`${editor_instance}.focus();">H3</div>
                <div class="btn btn-sm btn-light mr-1" title="CTRL-SHIFT-4" onclick="${editor_instance}.insertSnippet`+"('#### ${1:$SELECTION}');"+`${editor_instance}.focus();">H4</div>
                <div class="btn btn-sm btn-light mr-1" title="CTRL+\`" onclick="${editor_instance}.insertSnippet`+"('```${1:$SELECTION}```');"+`${editor_instance}.focus();"><i class="fa-solid fa-code"></i></div>
                <div class="btn btn-sm btn-light mr-1" title="CTRL-K" onclick="${editor_instance}.insertSnippet`+"('[${1:$SELECTION}](URL)');"+`${editor_instance}.focus();"><i class="fa-solid fa-link"></i></div>
                <div class="btn btn-sm btn-light mr-1" title="Insert table" onclick="${editor_instance}.insertSnippet`+"('|\\t|\\t|\\t|\\n|--|--|--|\\n|\\t|\\t|\\t|\\n|\\t|\\t|\\t|');"+`${editor_instance}.focus();"><i class="fa-solid fa-table"></i></div>
                <div class="btn btn-sm btn-light mr-1" title="Insert bullet list" onclick="${editor_instance}.insertSnippet`+"('\\n- \\n- \\n- ');"+`${editor_instance}.focus();"><i class="fa-solid fa-list"></i></div>
                <div class="btn btn-sm btn-light mr-1" title="Insert numbered list" onclick="${editor_instance}.insertSnippet`+"('\\n1. a  \\n2. b  \\n3. c  ');"+`${editor_instance}.focus();"><i class="fa-solid fa-list-ol"></i></div>
                <div class="btn btn-sm btn-transparent mr-1" title="Help" onclick="get_md_helper_modal();"><i class="fa-solid fa-question-circle"></i></div>

    `
    return header;
}