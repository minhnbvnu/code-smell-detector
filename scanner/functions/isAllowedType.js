function isAllowedType(title) {
            return isTypeParameterRequired(title) || title === 'throws' || title === 'const' || title === 'constant' ||
                title === 'namespace' || title === 'member' || title === 'var' || title === 'module' ||
                title === 'constructor' || title === 'class' || title === 'extends' || title === 'augments' ||
                title === 'public' || title === 'private' || title === 'protected';
        }