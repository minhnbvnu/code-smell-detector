function AsyncText(props) {
    const text = props.text;
    TextResource.read([props.text, props.ms]);
    return text;
  }