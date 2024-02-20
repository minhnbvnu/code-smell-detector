function filesFilter(files, config) {
  const { accept } = config;

  const filesKeys = Object.keys(files).filter((key) => {
    const file = files[key];
    const { type, name } = file;
    const extension = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : '';
    const baseType = type.replace(/\/.*$/, '');

    return accept
      .split(',')
      .map((type) => type.trim())
      .filter((type) => type)
      .some((acceptedType) => {
        if (/\..+$/.test(acceptedType)) {
          return extension === acceptedType;
        }

        if (/\/\*$/.test(acceptedType)) {
          return baseType === acceptedType.replace(/\/\*$/, '');
        }

        // eslint-disable-next-line no-useless-escape
        if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
          return type === acceptedType;
        }

        return false;
      });
  });

  return filesKeys.map((key) => files[key]);
}