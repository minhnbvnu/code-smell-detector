function makeDataAttributeString(props) {
    const keys = Object.keys(props);

    return keys
        .map((key) => {
            const _key = camelCaseToDash(key);
            const val = props[key];

            if (val === undefined) return '';
            return `data-${_key}="${val}" `;
        })
        .join('')
        .trim();
}