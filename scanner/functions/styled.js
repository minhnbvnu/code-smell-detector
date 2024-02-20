function styled(type, newStyles, queries = {}) {
  return React.forwardRef(({ style, ...rest }, ref) => {
    const theme = useTheme()

    const mediaStyles = Object.entries(queries).reduce(
      (current, [key, value]) => {
        return useMediaQuery(key)
          ? {
              ...current,
              ...(typeof value === 'function' ? value(rest, theme) : value),
            }
          : current
      },
      {}
    )

    return React.createElement(type, {
      ...rest,
      style: {
        ...(typeof newStyles === 'function'
          ? newStyles(rest, theme)
          : newStyles),
        ...style,
        ...mediaStyles,
      },
      ref,
    })
  })
}