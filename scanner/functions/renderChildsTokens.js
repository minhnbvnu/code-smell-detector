function renderChildsTokens(pos, tokens, slugs) {
    const headings = [];
    let buffer = '';
    let currentLevel;
    let subHeadings;
    const size = tokens.length;
    let i = pos;
    while (i < size) {
      const token = tokens[i];
      const heading = tokens[i - 1];
      const level = token.tag && parseInt(token.tag.substr(1, 1));
      if (
        token.type !== 'heading_close' ||
        options.includeLevel.indexOf(level) == -1 ||
        heading.type !== 'inline'
      ) {
        i++;
        continue; // Skip if not matching criteria
      }
      if (!currentLevel) {
        currentLevel = level; // We init with the first found level
      } else {
        if (level > currentLevel) {
          subHeadings = renderChildsTokens(i, tokens, slugs);
          buffer += subHeadings[1];
          i = subHeadings[0];
          continue;
        }
        if (level < currentLevel) {
          // Finishing the sub headings
          buffer += '</li>';
          headings.push(buffer);
          return [
            i,
            `<${options.listType} class="${options.listClass}">${headings.join('')}</${
              options.listType
            }>`,
          ];
        }
        if (level == currentLevel) {
          // Finishing the sub headings
          buffer += '</li>';
          headings.push(buffer);
        }
      }

      const content = heading.children.reduce((acc, t) => acc + t.content, '');
      const title = heading.content;
      const unique = (slugs[title] = title in slugs ? Number(slugs[title]) + 1 : '');
      const anchorAttrs = options.getAnchorAttrs(title, level, unique);

      buffer = `<li class="${options.listItemClass}">
      <a ${anchorAttrs.map(({ attr, value }) => `${attr}="${value}"`).join(' ')}>`;
      buffer += content;
      buffer += '</a>';
      i++;
    }

    buffer += buffer === '' ? '' : '</li>';
    headings.push(buffer);

    return [
      i,
      `<${options.listType} class="${options.listClass}">${headings.join('')}</${
        options.listType
      }>`,
    ];
  }