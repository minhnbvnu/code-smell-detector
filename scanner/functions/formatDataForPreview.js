function formatDataForPreview(data, showFormattedValue) {
  if (data != null && utils_hasOwnProperty.call(data, hydration["d" /* meta */].type)) {
    return showFormattedValue ? data[hydration["d" /* meta */].preview_long] : data[hydration["d" /* meta */].preview_short];
  }

  const type = getDataType(data);

  switch (type) {
    case 'html_element':
      return `<${truncateForDisplay(data.tagName.toLowerCase())} />`;

    case 'function':
      return truncateForDisplay(`ƒ ${typeof data.name === 'function' ? '' : data.name}() {}`);

    case 'string':
      return `"${data}"`;

    case 'bigint':
      return truncateForDisplay(data.toString() + 'n');

    case 'regexp':
      return truncateForDisplay(data.toString());

    case 'symbol':
      return truncateForDisplay(data.toString());

    case 'react_element':
      return `<${truncateForDisplay(getDisplayNameForReactElement(data) || 'Unknown')} />`;

    case 'array_buffer':
      return `ArrayBuffer(${data.byteLength})`;

    case 'data_view':
      return `DataView(${data.buffer.byteLength})`;

    case 'array':
      if (showFormattedValue) {
        let formatted = '';

        for (let i = 0; i < data.length; i++) {
          if (i > 0) {
            formatted += ', ';
          }

          formatted += formatDataForPreview(data[i], false);

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `[${truncateForDisplay(formatted)}]`;
      } else {
        const length = utils_hasOwnProperty.call(data, hydration["d" /* meta */].size) ? data[hydration["d" /* meta */].size] : data.length;
        return `Array(${length})`;
      }

    case 'typed_array':
      const shortName = `${data.constructor.name}(${data.length})`;

      if (showFormattedValue) {
        let formatted = '';

        for (let i = 0; i < data.length; i++) {
          if (i > 0) {
            formatted += ', ';
          }

          formatted += data[i];

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `${shortName} [${truncateForDisplay(formatted)}]`;
      } else {
        return shortName;
      }

    case 'iterator':
      const name = data.constructor.name;

      if (showFormattedValue) {
        // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.
        const array = Array.from(data);
        let formatted = '';

        for (let i = 0; i < array.length; i++) {
          const entryOrEntries = array[i];

          if (i > 0) {
            formatted += ', ';
          } // TRICKY
          // Browsers display Maps and Sets differently.
          // To mimic their behavior, detect if we've been given an entries tuple.
          //   Map(2) {"abc" => 123, "def" => 123}
          //   Set(2) {"abc", 123}


          if (Object(isArray["a" /* default */])(entryOrEntries)) {
            const key = formatDataForPreview(entryOrEntries[0], true);
            const value = formatDataForPreview(entryOrEntries[1], false);
            formatted += `${key} => ${value}`;
          } else {
            formatted += formatDataForPreview(entryOrEntries, false);
          }

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `${name}(${data.size}) {${truncateForDisplay(formatted)}}`;
      } else {
        return `${name}(${data.size})`;
      }

    case 'opaque_iterator':
      {
        return data[Symbol.toStringTag];
      }

    case 'date':
      return data.toString();

    case 'object':
      if (showFormattedValue) {
        const keys = Array.from(getAllEnumerableKeys(data)).sort(alphaSortKeys);
        let formatted = '';

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];

          if (i > 0) {
            formatted += ', ';
          }

          formatted += `${key.toString()}: ${formatDataForPreview(data[key], false)}`;

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return `{${truncateForDisplay(formatted)}}`;
      } else {
        return '{…}';
      }

    case 'boolean':
    case 'number':
    case 'infinity':
    case 'nan':
    case 'null':
    case 'undefined':
      return data;

    default:
      try {
        return truncateForDisplay(String(data));
      } catch (error) {
        return 'unserializable';
      }

  }
}