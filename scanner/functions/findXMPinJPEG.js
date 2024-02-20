function findXMPinJPEG(file) {
        if (!('DOMParser' in self)) {
            // console.warn('XML parsing not supported without DOMParser');
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log('Got file of length ' + file.byteLength);
        if (dataView.getUint8(0) != 0xff || dataView.getUint8(1) != 0xd8) {
            if (debug) console.log('Not a valid JPEG');
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < length - 4) {
            if (getStringFromDB(dataView, offset, 4) == 'http') {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(
                    dataView,
                    startOffset,
                    sectionLength
                );
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring(
                    xmpString.indexOf('<x:xmpmeta'),
                    xmpEndIndex
                );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10;
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString =
                    xmpString.slice(0, indexOfXmp) +
                    'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" ' +
                    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" ' +
                    'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" ' +
                    'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" ' +
                    'xmlns:exif="http://ns.adobe.com/exif/1.0/" ' +
                    'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" ' +
                    'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" ' +
                    'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" ' +
                    'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" ' +
                    'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' +
                    xmpString.slice(indexOfXmp);

                var domDocument = dom.parseFromString(xmpString, 'text/xml');
                return xml2Object(domDocument);
            } else {
                offset++;
            }
        }
    }