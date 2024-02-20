function inBody(node, pos) {
    var body = node.body,
        start,
        end;
    if (!body) return false;

    if (Array.isArray(body)) {
      start = body[0].start;
      end = body[body.length - 1].end;
    } else {
      start = body.start;
      end = body.end;
    }

    return start <= pos && end >= pos;
  }