function getParameterTypeNode(parameter) {
            var _a2;
            return parameter.kind === 344 /* JSDocParameterTag */ ? (_a2 = parameter.typeExpression) == null ? void 0 : _a2.type : parameter.type;
        }