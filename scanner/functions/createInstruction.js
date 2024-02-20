function createInstruction(instruction) {
                const literal = factory2.createNumericLiteral(instruction);
                addSyntheticTrailingComment(literal, 3 /* MultiLineCommentTrivia */, getInstructionName(instruction));
                return literal;
            }