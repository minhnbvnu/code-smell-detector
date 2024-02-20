function make_xml (src) {
        return '<?xml version="1.0" encoding="UTF-8" ?>' +
            '<wm-xml xmlns:ws="https://wamer.net/stencils">\n' + 
            ((src && typeof src === 'string') ? src.replace (/<!DOCTYPE[^>]*>/, '') : '')+
            '\n</wm-xml>';
    }