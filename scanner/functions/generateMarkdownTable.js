function generateMarkdownTable(contributors) {
  const perRow = 5;
  let currentRow;
  let markdown = [];
  for (let i = 0, j = contributors.length; i < j; i += perRow) {
    currentRow = contributors.slice(i, i + perRow);
    markdown.push(currentRow.map(c => (
        ` | [<img src="${c.author.avatar_url}" width="100px" /><br /><sub>${c.author.login}</sub>](https://github.com/${c.author.login})`
    )).join(''));
  }
  return [
    markdown[0],
    '|' + range(perRow).map(() => '---').join('|') + '|',
    ...markdown.slice(1)
  ].join('\n');
}