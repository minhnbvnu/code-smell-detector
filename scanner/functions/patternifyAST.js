function patternifyAST(ast, code) {
  switch (ast.type_) {
    case "pattern":
      {
        resolveReplications(ast);
        const children = ast.source_.map(child => patternifyAST(child, code)).map(applyOptions(ast, code));
        const alignment = ast.arguments_.alignment;

        if (alignment === "stack") {
          return _stack(...children);
        }

        if (alignment === "polymeter") {
          const stepsPerCycle = ast.arguments_.stepsPerCycle ? patternifyAST(ast.arguments_.stepsPerCycle, code).fmap(x2 => fraction(x2)) : pure(fraction(children.length > 0 ? children[0].__weight : 1));
          const aligned = children.map(child => child.fast(stepsPerCycle.fmap(x2 => x2.div(child.__weight || 1))));
          return _stack(...aligned);
        }

        if (alignment === "rand") {
          return chooseCycles(...children);
        }

        const weightedChildren = ast.source_.some(child => {
          var _a;

          return !!((_a = child.options_) == null ? void 0 : _a.weight);
        });

        if (!weightedChildren && alignment === "slowcat") {
          return _slowcat(...children);
        }

        if (weightedChildren) {
          const weightSum = ast.source_.reduce((sum, child) => {
            var _a;

            return sum + (((_a = child.options_) == null ? void 0 : _a.weight) || 1);
          }, 0);
          const pat2 = timeCat(...ast.source_.map((child, i) => {
            var _a;

            return [((_a = child.options_) == null ? void 0 : _a.weight) || 1, children[i]];
          }));

          if (alignment === "slowcat") {
            return pat2._slow(weightSum);
          }

          pat2.__weight = weightSum;
          return pat2;
        }

        const pat = _sequence(...children);

        pat.ast = ast;
        pat.__weight = children.length;
        return pat;
      }

    case "element":
      {
        const pat = patternifyAST(ast.source_, code);
        pat.ast = ast;
        return pat;
      }

    case "atom":
      {
        if (ast.source_ === "~") {
          return silence;
        }

        if (!ast.location_) {
          console.warn("no location for", ast);
          return ast.source_;
        }

        const {
          start,
          end
        } = ast.location_;
        const value = !isNaN(Number(ast.source_)) ? Number(ast.source_) : ast.source_;
        const actual = code == null ? void 0 : code.split("").slice(start.offset, end.offset).join("");
        const [offsetStart = 0, offsetEnd = 0] = actual ? actual.split(ast.source_).map(p => p.split("").filter(c => c === " ").length) : [];
        return pure(value).withLocation([start.line, start.column + offsetStart, start.offset + offsetStart], [start.line, end.column - offsetEnd, end.offset - offsetEnd]);
      }

    case "stretch":
      return patternifyAST(ast.source_, code).slow(patternifyAST(ast.arguments_.amount, code));

    default:
      console.warn(`node type "${ast.type_}" not implemented -> returning silence`);
      return silence;
  }
}