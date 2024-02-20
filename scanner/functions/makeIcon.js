function makeIcon(path) {
  return function IconComponent() {
    return (
      <svg width="100%" viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    );
  };
}