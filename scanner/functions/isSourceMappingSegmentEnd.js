function isSourceMappingSegmentEnd() {
                return pos === mappings.length || mappings.charCodeAt(pos) === 44 /* comma */ || mappings.charCodeAt(pos) === 59 /* semicolon */;
            }