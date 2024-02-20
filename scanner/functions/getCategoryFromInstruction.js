function getCategoryFromInstruction(type) {
  type = type | 0;
  switch (type) {
    case INSTR.THIS:
      return CATEGORY.THIS | 0;
    case INSTR.UNARY:
      return CATEGORY.UNARY | 0;
    case INSTR.UPDATE:
      return CATEGORY.UPDATE | 0;
    case INSTR.BINARY:
      return CATEGORY.BINARY | 0;
    case INSTR.LOGICAL:
      return CATEGORY.LOGICAL | 0;
    case INSTR.TERNARY:
      return CATEGORY.TERNARY | 0;
    case INSTR.ASSIGN:
      return CATEGORY.ASSIGN | 0;
    case INSTR.ALLOC:
      return CATEGORY.ALLOC | 0;
    case INSTR.MEMBER_EXPR:
      return CATEGORY.MEMBER | 0;
    case INSTR.LITERAL:
      return CATEGORY.LITERAL | 0;
    case INSTR.IDENTIFIER:
      return CATEGORY.IDENTIFIER | 0;
    case INSTR.TRY_ENTER:
    case INSTR.TRY_LEAVE:
      return CATEGORY.TRY | 0;
    case INSTR.CATCH_ENTER:
    case INSTR.CATCH_LEAVE:
      return CATEGORY.CATCH | 0;
    case INSTR.FINAL_ENTER:
    case INSTR.FINAL_LEAVE:
      return CATEGORY.FINALLY | 0;
    case INSTR.OP_NEW:
    case INSTR.OP_NEW_END:
      return CATEGORY.OP_NEW | 0;
    case INSTR.VAR_INIT:
    case INSTR.VAR_DECLARE:
      return CATEGORY.VAR | 0;
    case INSTR.IF_TEST:
    case INSTR.IF_ENTER:
    case INSTR.IF_LEAVE:
      return CATEGORY.IF | 0;
    case INSTR.ELSE_ENTER:
    case INSTR.ELSE_LEAVE:
      return CATEGORY.ELSE | 0;
    case INSTR.SWITCH_TEST:
    case INSTR.SWITCH_ENTER:
    case INSTR.SWITCH_LEAVE:
      return CATEGORY.SWITCH | 0;
    case INSTR.CASE_TEST:
    case INSTR.CASE_ENTER:
    case INSTR.CASE_LEAVE:
      return CATEGORY.CASE | 0;
    case INSTR.BREAK:
      return CATEGORY.BREAK | 0;
    case INSTR.CONTINUE:
      return CATEGORY.CONTINUE | 0;
    case INSTR.LOOP_TEST:
    case INSTR.LOOP_ENTER:
    case INSTR.LOOP_LEAVE:
      return CATEGORY.LOOP | 0;
    case INSTR.FUNCTION_CALL:
    case INSTR.FUNCTION_CALL_END:
      return CATEGORY.CALL | 0;
    case INSTR.FUNCTION_ENTER:
    case INSTR.FUNCTION_LEAVE:
    case INSTR.FUNCTION_RETURN:
      return CATEGORY.FUNCTION | 0;
    case INSTR.BLOCK_ENTER:
    case INSTR.BLOCK_LEAVE:
      return CATEGORY.BLOCK | 0;
    case INSTR.PROGRAM:
    case INSTR.PROGRAM_ENTER:
    case INSTR.PROGRAM_LEAVE:
    case INSTR.PROGRAM_FRAME_VALUE:
      return CATEGORY.PROGRAM | 0;
    case INSTR.METHOD_ENTER:
    case INSTR.METHOD_LEAVE:
      return CATEGORY.METHOD | 0;
    case INSTR.SUPER:
      return CATEGORY.SUPER | 0;
  };
  return -1;
}