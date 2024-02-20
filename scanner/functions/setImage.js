function setImage(info, target, miplevel) {
                var element = info.element;
                var data = info.data;
                var internalformat = info.internalformat;
                var format = info.format;
                var type = info.type;
                var width = info.width;
                var height = info.height;
                setFlags(info);
                if (element) {
                    gl.texImage2D(target, miplevel, format, format, type, element);
                }
                else if (info.compressed) {
                    gl.compressedTexImage2D(target, miplevel, internalformat, width, height, 0, data);
                }
                else if (info.needsCopy) {
                    reglPoll();
                    gl.copyTexImage2D(target, miplevel, format, info.xOffset, info.yOffset, width, height, 0);
                }
                else {
                    gl.texImage2D(target, miplevel, format, width, height, 0, format, type, data || null);
                }
            }