function upgradeUnserializable(destination, source) {
  Object.defineProperties(destination, {
    [meta.inspected]: {
      configurable: true,
      enumerable: false,
      value: !!source.inspected
    },
    [meta.name]: {
      configurable: true,
      enumerable: false,
      value: source.name
    },
    [meta.preview_long]: {
      configurable: true,
      enumerable: false,
      value: source.preview_long
    },
    [meta.preview_short]: {
      configurable: true,
      enumerable: false,
      value: source.preview_short
    },
    [meta.size]: {
      configurable: true,
      enumerable: false,
      value: source.size
    },
    [meta.readonly]: {
      configurable: true,
      enumerable: false,
      value: !!source.readonly
    },
    [meta.type]: {
      configurable: true,
      enumerable: false,
      value: source.type
    },
    [meta.unserializable]: {
      configurable: true,
      enumerable: false,
      value: !!source.unserializable
    }
  });
  delete destination.inspected;
  delete destination.name;
  delete destination.preview_long;
  delete destination.preview_short;
  delete destination.size;
  delete destination.readonly;
  delete destination.type;
  delete destination.unserializable;
}