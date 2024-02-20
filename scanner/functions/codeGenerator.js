function codeGenerator(node) {

  switch (node.type) {
    // 遍历 body 属性中的节点，且递归调用 codeGenerator，按行输出结果
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    // 表达式，处理表达式内容，并用分号结尾
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) +
        ';'
      );

    // 函数调用，添加左右括号，参数用逗号隔开
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );

    // 标识符，返回其 name
    case 'Identifier':
      return node.name;
    // 数值，返回其 value
    case 'NumberLiteral':
      return node.value;

    // 字符串，用双引号包裹再输出
    case 'StringLiteral':
      return '"' + node.value + '"';

    // 当遇到无法识别的字符，抛出错误提示，并退出
    default:
      throw new TypeError(node.type);
  }
}