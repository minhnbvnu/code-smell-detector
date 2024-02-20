function Notify(options) {
  options = Object.assign(
    Object.assign({}, defaultOptions),
    parseOptions(options)
  );
  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);
  delete options.context;
  delete options.selector;
  if (notify) {
    notify.setData(options);
    notify.show();
    return notify;
  }
  console.warn('未找到 van-notify 节点，请确认 selector 及 context 是否正确');
}