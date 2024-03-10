function get_constructor(type) {
    switch (type) {
      case "AwaitBlock":
        return AwaitBlock;
      case "Body":
        return Body;
      case "Comment":
        return Comment$1;
      case "ConstTag":
        return ConstTag;
      case "Document":
        return Document;
      case "EachBlock":
        return EachBlock;
      case "Element":
        return Element;
      case "Head":
        return Head;
      case "IfBlock":
        return IfBlock;
      case "InlineComponent":
        return InlineComponent;
      case "KeyBlock":
        return KeyBlock;
      case "MustacheTag":
        return MustacheTag;
      case "Options":
        return Options;
      case "RawMustacheTag":
        return RawMustacheTag;
      case "DebugTag":
        return DebugTag;
      case "Slot":
        return Slot;
      case "SlotTemplate":
        return SlotTemplate;
      case "Text":
        return Text;
      case "Title":
        return Title;
      case "Window":
        return Window;
      default:
        throw new Error(`Not implemented: ${type}`);
    }
  }