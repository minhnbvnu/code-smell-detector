function complexity(exp) {
        var score = 0;
        if (exp) {
            if (Array.isArray(exp)) {
                exp.forEach(function (tok) {
                    score += complexity(tok);
                });
            } else {
                switch (exp.arity) {
                case 'statement':
                    switch (exp.id) {
                    case 'if':
                        score += complexity(exp.first) + complexity(exp.block) +
                            complexity(exp['else']) + 1;
                        break;
                    case 'while':
                    case 'do':
                        if (exp.first.id !== 'true' && exp.first.number !== 1) {
                            score += 1;
                        }
                        score += complexity(exp.first) + complexity(exp.block);
                        break;
                    case 'for':
                        if (exp.second !== undefined &&
                                exp.second.id !== 'true' &&
                                exp.second.number !== 1) {
                            score += 1;
                        }
                        score += complexity(exp.first) + complexity(exp.second) +
                            complexity(exp.third) + complexity(exp.block);
                        break;
                    case 'switch':
                        score += complexity(exp.first) +
                            complexity(exp.second) + exp.second.length;
                        if (exp.second[exp.second.length - 1].id === 'default') {
                            score -= 1;
                        }
                        break;
                    case 'try':
                        if (exp.second) {
                            score += 1;
                        }
                        if (exp.third) {
                            score += 1;
                        }
                        score += complexity(exp.first) + complexity(exp.second) +
                            complexity(exp.third) + complexity(exp.block);
                        break;
                    }
                    break;
                case 'prefix':
                    score += complexity(exp.first);
                    break;
                case 'case':
                case 'infix':
                    score += complexity(exp.first) + complexity(exp.second);
                    if (exp.id === '&&' || exp.id === '||') {
                        score += 1;
                    }
                    break;
                case 'ternary':
                    score += complexity(exp.first) + complexity(exp.second) + complexity(exp.third);
                    break;
                }
            }
        }
        return score;
    }