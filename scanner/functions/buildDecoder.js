function buildDecoder(fields) {
    var code = 'var result = {};\n';

    // Generate field extraction code
    fields = BigInt(fields);
    var offset = 0;
    var has_tlv = false;
    for (let i = 0; fields; (i++, fields >>= BigInt(1))) {
        if (!(fields & BigInt(1))) continue;
        if ((i % 32) === 29 || (i % 32) === 30)
            throw new Error('Radiotap Namespace / Vendor Namespace not implemented yet');
        if (i === 28) {
            has_tlv = true;
            break;
        }

        if (!Object.hasOwnProperty.call(radiotap_fields, i))
            throw new Error(`Unknown field bit ${i}`);
        const { id, structure, align } = radiotap_fields[i];
        // consume alignment
        offset += (((-offset) % align) + align) % align;
        // prepare structure
        let things = structure.map(([kind, name]) => [kind, id + '.' + name]);
        if (structure.length === 1)
            things[0][1] = id || structure[0][1];
        else
            code += `result.${id} = {};\n`; // extensions with many fields are grouped
        // parse the things
        things.forEach(([kind, name]) => {
            if (typeof kind === 'number') {
                code += `result.${name} = data.slice(offset + ${offset}, offset + ${offset + kind});\n`;
                offset += kind;
                return;
            }
            // FIXME: parse flags too
            const fname = associations[kind].toString();
            code += `result.${name} = ${fname}offset + ${offset});\n`;
            offset += Number(kind.substring(1))/8;
        });
    }

    // Check length
    var pre_check = '';
    pre_check += `if (end_offset - offset < ${offset})\n`;
    pre_check += `  throw Error('Radiotap header length too short');\n`;

    // Extract TLV or check for extra data
    if (has_tlv) {
        if (fields >> BigInt(1))
            throw Error('If bit 28 (TLV) is set, no higher bits can be set');
        // FIXME: parse better?
        code += `result.tlv = Buffer.slice(data, offset+${offset}, end_offset);\n`;
    } else {
        // FIXME: make this a warning
        pre_check += `if (end_offset - offset > ${offset})\n`;
        pre_check += `  throw Error('Radiotap header length too high, extra data?');\n`;
    }

    code = pre_check + code + 'return result;';
    return new Function('readBigUInt64LE', 'data', 'offset', 'end_offset', code)
        .bind(null, readBigUInt64LE);
}