function Multistep({ children, ...props }) {
  const { render, ...context } = useMultistep(props);

  if (typeof children === 'function') {
    return render(children(context));
  }

  return render(children);
}