function next_script () {
    setTimeout (function () {
        var ent = scripts[sc_index];
        if (!ent) return do_continue ();

        sc_index++;

        var ent_src = ent.getAttribute ('src');
        if (ent_src) include_js_byref  (ent_src);
        else         include_js        (xml_node_value (ent));
    }, 0);
}