function pushEndInstance(target, type, props) {
              switch (type) {
                case "area":
                case "base":
                case "br":
                case "col":
                case "embed":
                case "hr":
                case "img":
                case "input":
                case "keygen":
                case "link":
                case "meta":
                case "param":
                case "source":
                case "track":
                case "wbr": {
                  break;
                }
                default: {
                  target.push(endTag1, stringToChunk(type), endTag2);
                }
              }
            }