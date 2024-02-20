function get_slot_definition(block, scope, lets) {
    if (lets.length === 0)
      return { block, scope };
    const context_input = {
      type: "ObjectPattern",
      properties: lets.map((l) => ({
        type: "Property",
        kind: "init",
        key: l.name,
        value: l.value || l.name
      }))
    };
    const properties2 = [];
    const value_map = /* @__PURE__ */ new Map();
    lets.forEach((l) => {
      let value;
      if (l.names.length > 1) {
        const unique_name = block.get_unique_name(l.names.join("_")).name;
        value_map.set(l.value, unique_name);
        value = { type: "Identifier", name: unique_name };
      } else {
        value = l.value || l.name;
      }
      properties2.push({
        type: "Property",
        kind: "init",
        key: l.name,
        value
      });
    });
    const changes_input = {
      type: "ObjectPattern",
      properties: properties2
    };
    const names = /* @__PURE__ */ new Set();
    const names_lookup = /* @__PURE__ */ new Map();
    lets.forEach((l) => {
      l.names.forEach((name2) => {
        names.add(name2);
        if (value_map.has(l.value)) {
          names_lookup.set(name2, value_map.get(l.value));
        }
      });
    });
    const context = {
      type: "ObjectExpression",
      properties: Array.from(names).map((name2) => p`${block.renderer.context_lookup.get(name2).index}: ${name2}`)
    };
    const { context_lookup } = block.renderer;
    const changes = {
      type: "ParenthesizedExpression",
      get expression() {
        if (block.renderer.context_overflow) {
          const grouped = [];
          Array.from(names).forEach((name2) => {
            const i = context_lookup.get(name2).index.value;
            const g2 = Math.floor(i / 31);
            const lookup_name = names_lookup.has(name2) ? names_lookup.get(name2) : name2;
            if (!grouped[g2])
              grouped[g2] = [];
            grouped[g2].push({ name: lookup_name, n: i % 31 });
          });
          const elements = [];
          for (let g2 = 0; g2 < grouped.length; g2 += 1) {
            elements[g2] = grouped[g2] ? grouped[g2].map(({ name: name2, n: n2 }) => x`${name2} ? ${1 << n2} : 0`).reduce((lhs, rhs) => x`${lhs} | ${rhs}`) : x`0`;
          }
          return {
            type: "ArrayExpression",
            elements
          };
        }
        return Array.from(names).map((name2) => {
          const lookup_name = names_lookup.has(name2) ? names_lookup.get(name2) : name2;
          const i = context_lookup.get(name2).index.value;
          return x`${lookup_name} ? ${1 << i} : 0`;
        }).reduce((lhs, rhs) => x`${lhs} | ${rhs}`);
      }
    };
    return {
      block,
      scope,
      get_context: x`${context_input} => ${context}`,
      get_changes: x`${changes_input} => ${changes}`
    };
  }