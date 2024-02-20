function mustache(parser) {
    const start = parser.index;
    parser.index += 1;
    parser.allow_whitespace();
    if (parser.eat("/")) {
      let block = parser.current();
      let expected;
      if (closing_tag_omitted(block.name)) {
        block.end = start;
        parser.stack.pop();
        block = parser.current();
      }
      if (block.type === "ElseBlock" || block.type === "PendingBlock" || block.type === "ThenBlock" || block.type === "CatchBlock") {
        block.end = start;
        parser.stack.pop();
        block = parser.current();
        expected = "await";
      }
      if (block.type === "IfBlock") {
        expected = "if";
      } else if (block.type === "EachBlock") {
        expected = "each";
      } else if (block.type === "AwaitBlock") {
        expected = "await";
      } else if (block.type === "KeyBlock") {
        expected = "key";
      } else {
        parser.error(parser_errors.unexpected_block_close);
      }
      parser.eat(expected, true);
      parser.allow_whitespace();
      parser.eat("}", true);
      while (block.elseif) {
        block.end = parser.index;
        parser.stack.pop();
        block = parser.current();
        if (block.else) {
          block.else.end = start;
        }
      }
      const char_before = parser.template[block.start - 1];
      const char_after = parser.template[parser.index];
      const trim_before = !char_before || regex_whitespace.test(char_before);
      const trim_after = !char_after || regex_whitespace.test(char_after);
      trim_whitespace(block, trim_before, trim_after);
      block.end = parser.index;
      parser.stack.pop();
    } else if (parser.eat(":else")) {
      if (parser.eat("if")) {
        parser.error(parser_errors.invalid_elseif);
      }
      parser.allow_whitespace();
      if (parser.eat("if")) {
        const block = parser.current();
        if (block.type !== "IfBlock") {
          parser.error(parser.stack.some((block2) => block2.type === "IfBlock") ? parser_errors.invalid_elseif_placement_unclosed_block(to_string(block)) : parser_errors.invalid_elseif_placement_outside_if);
        }
        parser.require_whitespace();
        const expression = read_expression(parser);
        parser.allow_whitespace();
        parser.eat("}", true);
        block.else = {
          start: parser.index,
          end: null,
          type: "ElseBlock",
          children: [
            {
              start: parser.index,
              end: null,
              type: "IfBlock",
              elseif: true,
              expression,
              children: []
            }
          ]
        };
        parser.stack.push(block.else.children[0]);
      } else {
        const block = parser.current();
        if (block.type !== "IfBlock" && block.type !== "EachBlock") {
          parser.error(parser.stack.some((block2) => block2.type === "IfBlock" || block2.type === "EachBlock") ? parser_errors.invalid_else_placement_unclosed_block(to_string(block)) : parser_errors.invalid_else_placement_outside_if);
        }
        parser.allow_whitespace();
        parser.eat("}", true);
        block.else = {
          start: parser.index,
          end: null,
          type: "ElseBlock",
          children: []
        };
        parser.stack.push(block.else);
      }
    } else if (parser.match(":then") || parser.match(":catch")) {
      const block = parser.current();
      const is_then = parser.eat(":then") || !parser.eat(":catch");
      if (is_then) {
        if (block.type !== "PendingBlock") {
          parser.error(parser.stack.some((block2) => block2.type === "PendingBlock") ? parser_errors.invalid_then_placement_unclosed_block(to_string(block)) : parser_errors.invalid_then_placement_without_await);
        }
      } else {
        if (block.type !== "ThenBlock" && block.type !== "PendingBlock") {
          parser.error(parser.stack.some((block2) => block2.type === "ThenBlock" || block2.type === "PendingBlock") ? parser_errors.invalid_catch_placement_unclosed_block(to_string(block)) : parser_errors.invalid_catch_placement_without_await);
        }
      }
      block.end = start;
      parser.stack.pop();
      const await_block = parser.current();
      if (!parser.eat("}")) {
        parser.require_whitespace();
        await_block[is_then ? "value" : "error"] = read_context(parser);
        parser.allow_whitespace();
        parser.eat("}", true);
      }
      const new_block = {
        start,
        end: null,
        type: is_then ? "ThenBlock" : "CatchBlock",
        children: [],
        skip: false
      };
      await_block[is_then ? "then" : "catch"] = new_block;
      parser.stack.push(new_block);
    } else if (parser.eat("#")) {
      let type;
      if (parser.eat("if")) {
        type = "IfBlock";
      } else if (parser.eat("each")) {
        type = "EachBlock";
      } else if (parser.eat("await")) {
        type = "AwaitBlock";
      } else if (parser.eat("key")) {
        type = "KeyBlock";
      } else {
        parser.error(parser_errors.expected_block_type);
      }
      parser.require_whitespace();
      const expression = read_expression(parser);
      const block = type === "AwaitBlock" ? {
        start,
        end: null,
        type,
        expression,
        value: null,
        error: null,
        pending: {
          start: null,
          end: null,
          type: "PendingBlock",
          children: [],
          skip: true
        },
        then: {
          start: null,
          end: null,
          type: "ThenBlock",
          children: [],
          skip: true
        },
        catch: {
          start: null,
          end: null,
          type: "CatchBlock",
          children: [],
          skip: true
        }
      } : {
        start,
        end: null,
        type,
        expression,
        children: []
      };
      parser.allow_whitespace();
      if (type === "EachBlock") {
        parser.eat("as", true);
        parser.require_whitespace();
        block.context = read_context(parser);
        parser.allow_whitespace();
        if (parser.eat(",")) {
          parser.allow_whitespace();
          block.index = parser.read_identifier();
          if (!block.index)
            parser.error(parser_errors.expected_name);
          parser.allow_whitespace();
        }
        if (parser.eat("(")) {
          parser.allow_whitespace();
          block.key = read_expression(parser);
          parser.allow_whitespace();
          parser.eat(")", true);
          parser.allow_whitespace();
        }
      }
      const await_block_shorthand = type === "AwaitBlock" && parser.eat("then");
      if (await_block_shorthand) {
        if (parser.match_regex(regex_whitespace_with_closing_curly_brace)) {
          parser.allow_whitespace();
        } else {
          parser.require_whitespace();
          block.value = read_context(parser);
          parser.allow_whitespace();
        }
      }
      const await_block_catch_shorthand = !await_block_shorthand && type === "AwaitBlock" && parser.eat("catch");
      if (await_block_catch_shorthand) {
        if (parser.match_regex(regex_whitespace_with_closing_curly_brace)) {
          parser.allow_whitespace();
        } else {
          parser.require_whitespace();
          block.error = read_context(parser);
          parser.allow_whitespace();
        }
      }
      parser.eat("}", true);
      parser.current().children.push(block);
      parser.stack.push(block);
      if (type === "AwaitBlock") {
        let child_block;
        if (await_block_shorthand) {
          block.then.skip = false;
          child_block = block.then;
        } else if (await_block_catch_shorthand) {
          block.catch.skip = false;
          child_block = block.catch;
        } else {
          block.pending.skip = false;
          child_block = block.pending;
        }
        child_block.start = parser.index;
        parser.stack.push(child_block);
      }
    } else if (parser.eat("@html")) {
      parser.require_whitespace();
      const expression = read_expression(parser);
      parser.allow_whitespace();
      parser.eat("}", true);
      parser.current().children.push({
        start,
        end: parser.index,
        type: "RawMustacheTag",
        expression
      });
    } else if (parser.eat("@debug")) {
      let identifiers;
      if (parser.read(regex_whitespace_with_closing_curly_brace)) {
        identifiers = [];
      } else {
        const expression = read_expression(parser);
        identifiers = expression.type === "SequenceExpression" ? expression.expressions : [expression];
        identifiers.forEach((node2) => {
          if (node2.type !== "Identifier") {
            parser.error(parser_errors.invalid_debug_args, node2.start);
          }
        });
        parser.allow_whitespace();
        parser.eat("}", true);
      }
      parser.current().children.push({
        start,
        end: parser.index,
        type: "DebugTag",
        identifiers
      });
    } else if (parser.eat("@const")) {
      parser.require_whitespace();
      const expression = read_expression(parser);
      if (!(expression.type === "AssignmentExpression" && expression.operator === "=")) {
        parser.error({
          code: "invalid-const-args",
          message: "{@const ...} must be an assignment."
        }, start);
      }
      parser.allow_whitespace();
      parser.eat("}", true);
      parser.current().children.push({
        start,
        end: parser.index,
        type: "ConstTag",
        expression
      });
    } else {
      const expression = read_expression(parser);
      parser.allow_whitespace();
      parser.eat("}", true);
      parser.current().children.push({
        start,
        end: parser.index,
        type: "MustacheTag",
        expression
      });
    }
  }