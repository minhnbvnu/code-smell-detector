function UserAvatar(props) {
  const {
    src,
    name,
    isGray,
    color,
    colors = defaultColors,
    clickAvatar,
    size,
    borderRadius,
    showLogo,
    className,
  } = props;

  const innerStyle = {
    textAlign: 'center',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius,
    lineHeight: `${size}px`,
    color: 'white',
    display: 'inline-block',
  };

  const imgStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius,
  };

  let inner;
  if (src) {
    inner = <img style={imgStyle} src={src} alt={name} />;
  } else {
    let background;
    if (color) {
      background = color;
    } else {
      // pick a deterministic color from the list
      const i = sumChars(name) % colors.length;
      background = colors[i];
    }

    innerStyle.backgroundColor = background;

    inner = <span>{name.charAt(0)}</span>;
  }

  return (
    <div
      className={classnames(className, isGray ? 'userAvatar gray' : 'userAvatar')}
      style={innerStyle}
      onClick={clickAvatar}
    >
      {showLogo && (
        <svg className="icon viaGithub" aria-hidden="true">
          <use xlinkHref="#icon-github" />
        </svg>
      )}
      {inner}
    </div>
  );
}