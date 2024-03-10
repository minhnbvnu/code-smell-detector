            ByteBufferPrototype.writeVarint64 = function(value, offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof value === 'number')
                        value = Long.fromNumber(value);
                    else if (!(value && value instanceof Long))
                        throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
                }
                if (typeof value === 'number')
                    value = Long.fromNumber(value, false);
                else if (value.unsigned !== false) value = value.toSigned();
                var size = ByteBuffer.calculateVarint64(value),
                    part0 = value.toInt() >>> 0,
                    part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                    part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
                offset += size;
                var capacity11 = this.buffer.byteLength;
                if (offset > capacity11)
                    this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
                offset -= size;
                switch (size) {
                    case 10: this.view.setUint8(offset+9, (part2 >>>  7) & 0x01);
                    case 9 : this.view.setUint8(offset+8, size !== 9 ? (part2       ) | 0x80 : (part2       ) & 0x7F);
                    case 8 : this.view.setUint8(offset+7, size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F);
                    case 7 : this.view.setUint8(offset+6, size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F);
                    case 6 : this.view.setUint8(offset+5, size !== 6 ? (part1 >>>  7) | 0x80 : (part1 >>>  7) & 0x7F);
                    case 5 : this.view.setUint8(offset+4, size !== 5 ? (part1       ) | 0x80 : (part1       ) & 0x7F);
                    case 4 : this.view.setUint8(offset+3, size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F);
                    case 3 : this.view.setUint8(offset+2, size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F);
                    case 2 : this.view.setUint8(offset+1, size !== 2 ? (part0 >>>  7) | 0x80 : (part0 >>>  7) & 0x7F);
                    case 1 : this.view.setUint8(offset  , size !== 1 ? (part0       ) | 0x80 : (part0       ) & 0x7F);
                }
                if (relative) {
                    this.offset += size;
                    return this;
                } else {
                    return size;
                }
            };
        ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
            if (typeof metrics === 'number') {
                offset = metrics;
                metrics = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;
            if (!this.noAssert) {
                if (typeof length !== 'number' || length % 1 !== 0)
                    throw TypeError("Illegal length: "+length+" (not an integer)");
                length |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var i = 0,
                start = offset,
                sd;
            if (metrics === ByteBuffer.METRICS_CHARS) { // The same for node and the browser
                sd = stringDestination();
                utfx.decodeUTF8(function() {
                    return i < length && offset < this.limit ? this.view.getUint8(offset++) : null;
                }.bind(this), function(cp) {
                    ++i; utfx.UTF8toUTF16(cp, sd);
                }.bind(this));
                if (i !== length)
                    throw RangeError("Illegal range: Truncated data, "+i+" == "+length);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        "string": sd(),
                        "length": offset - start
                    };
                }
            } else if (metrics === ByteBuffer.METRICS_BYTES) {
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + length > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
                }
                var k = offset + length;
                utfx.decodeUTF8toUTF16(function() {
                    return offset < k ? this.view.getUint8(offset++) : null;
                }.bind(this), sd = stringDestination(), this.noAssert);
                if (offset !== k)
                    throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        'string': sd(),
                        'length': offset - start
                    };
                }
            } else
                throw TypeError("Unsupported metrics: "+metrics);
        };
        ByteBufferPrototype.toDebug = function(columns) {
            var i = -1,
                k = this.buffer.byteLength,
                b,
                hex = "",
                asc = "",
                out = "";
            while (i<k) {
                if (i !== -1) {
                    b = this.view.getUint8(i);
                    if (b < 0x10) hex += "0"+b.toString(16).toUpperCase();
                    else hex += b.toString(16).toUpperCase();
                    if (columns) {
                        asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
                    }
                }
                ++i;
                if (columns) {
                    if (i > 0 && i % 16 === 0 && i !== k) {
                        while (hex.length < 3*16+3) hex += " ";
                        out += hex+asc+"\n";
                        hex = asc = "";
                    }
                }
                if (i === this.offset && i === this.limit)
                    hex += i === this.markedOffset ? "!" : "|";
                else if (i === this.offset)
                    hex += i === this.markedOffset ? "[" : "<";
                else if (i === this.limit)
                    hex += i === this.markedOffset ? "]" : ">";
                else
                    hex += i === this.markedOffset ? "'" : (columns || (i !== 0 && i !== k) ? " " : "");
            }
            if (columns && hex !== " ") {
                while (hex.length < 3*16+3) hex += " ";
                out += hex+asc+"\n";
            }
            return columns ? out : hex;
        };
        ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
            var k = str.length,
                bb = new ByteBuffer(((k+1)/3)|0, littleEndian, noAssert);
            var i = 0, j = 0, ch, b,
                rs = false, // Require symbol next
                ho = false, hm = false, hl = false, // Already has offset, markedOffset, limit?
                fail = false;
            while (i<k) {
                switch (ch = str.charAt(i++)) {
                    case '!':
                        if (!noAssert) {
                            if (ho || hm || hl) {
                                fail = true; break;
                            }
                            ho = hm = hl = true;
                        }
                        bb.offset = bb.markedOffset = bb.limit = j;
                        rs = false;
                        break;
                    case '|':
                        if (!noAssert) {
                            if (ho || hl) {
                                fail = true; break;
                            }
                            ho = hl = true;
                        }
                        bb.offset = bb.limit = j;
                        rs = false;
                        break;
                    case '[':
                        if (!noAssert) {
                            if (ho || hm) {
                                fail = true; break;
                            }
                            ho = hm = true;
                        }
                        bb.offset = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '<':
                        if (!noAssert) {
                            if (ho) {
                                fail = true; break;
                            }
                            ho = true;
                        }
                        bb.offset = j;
                        rs = false;
                        break;
                    case ']':
                        if (!noAssert) {
                            if (hl || hm) {
                                fail = true; break;
                            }
                            hl = hm = true;
                        }
                        bb.limit = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '>':
                        if (!noAssert) {
                            if (hl) {
                                fail = true; break;
                            }
                            hl = true;
                        }
                        bb.limit = j;
                        rs = false;
                        break;
                    case "'":
                        if (!noAssert) {
                            if (hm) {
                                fail = true; break;
                            }
                            hm = true;
                        }
                        bb.markedOffset = j;
                        rs = false;
                        break;
                    case ' ':
                        rs = false;
                        break;
                    default:
                        if (!noAssert) {
                            if (rs) {
                                fail = true; break;
                            }
                        }
                        b = parseInt(ch+str.charAt(i++), 16);
                        if (!noAssert) {
                            if (isNaN(b) || b < 0 || b > 255)
                                throw TypeError("Illegal str: Not a debug encoded string");
                        }
                        bb.view.setUint8(j++, b);
                        rs = true;
                }
                if (fail)
                    throw TypeError("Illegal str: Invalid symbol at "+i);
            }
            if (!noAssert) {
                if (!ho || !hl)
                    throw TypeError("Illegal str: Missing offset or limit");
                if (j<bb.buffer.byteLength)
                    throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);
            }
            return bb;
        };