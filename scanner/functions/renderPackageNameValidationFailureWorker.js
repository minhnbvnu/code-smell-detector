function renderPackageNameValidationFailureWorker(typing, result, name, isScopeName) {
            const kind = isScopeName ? "Scope" : "Package";
            switch (result) {
                case 1 /* EmptyName */:
                    return `'${typing}':: ${kind} name '${name}' cannot be empty`;
                case 2 /* NameTooLong */:
                    return `'${typing}':: ${kind} name '${name}' should be less than ${maxPackageNameLength} characters`;
                case 3 /* NameStartsWithDot */:
                    return `'${typing}':: ${kind} name '${name}' cannot start with '.'`;
                case 4 /* NameStartsWithUnderscore */:
                    return `'${typing}':: ${kind} name '${name}' cannot start with '_'`;
                case 5 /* NameContainsNonURISafeCharacters */:
                    return `'${typing}':: ${kind} name '${name}' contains non URI safe characters`;
                case 0 /* Ok */:
                    return Debug.fail();
                default:
                    throw Debug.assertNever(result);
            }
        }