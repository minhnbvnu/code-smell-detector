function setSubImage(info, target, x, y, miplevel) {
                var element = info.element;
                var data = info.data;
                var internalformat = info.internalformat;
                var format = info.format;
                var type = info.type;
                var width = info.width;
                var height = info.height;
                setFlags(info);
                if (element) {
                    gl.texSubImage2D(target, miplevel, x, y, format, type, element);
                }
                else if (info.compressed) {
                    gl.compressedTexSubImage2D(target, miplevel, x, y, internalformat, width, height, data);
                }
                else if (info.needsCopy) {
                    reglPoll();
                    gl.copyTexSubImage2D(target, miplevel, x, y, info.xOffset, info.yOffset, width, height);
                }
                else {
                    gl.texSubImage2D(target, miplevel, x, y, width, height, format, type, data);
                }
            }