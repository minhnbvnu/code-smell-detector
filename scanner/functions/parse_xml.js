function parse_xml (src) {
        var xml, tmp;
        if (!src || typeof src !== 'string') return null;

        try {
            if (window.DOMParser) {  // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString (src, "text/xml" );
            } else {                 // IE
                xml = new ActiveXObject( "Microsoft.XMLDOM" );
                xml.async = "false";
                xml.loadXML (src);
            }
        } catch (e) {
            xml = undefined;
        }

        if (!xml || !xml.documentElement || xml.getElementsByTagName ('parsererror').length) {
            dbg_error ('XML parse error: ' + src.substring (0, 100));
        }

        return xml;
    }