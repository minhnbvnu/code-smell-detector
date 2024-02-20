function xml_node_value (xelem) {
    var result = xelem.innerHTML || xelem.xml;

    if (!result && window.XMLSerializer) { // IE check... again
        result = (new window.XMLSerializer()).serializeToString (xelem);
        // remove wrapping tag
        result = result.replace(/^\s*<[^>]*>|<\/[^>]*>\s*$/g, '');
    }

    return result || '';
}