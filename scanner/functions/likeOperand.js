function likeOperand(operand) {
  return {...operand, value: `%${operand.value}%`};
}