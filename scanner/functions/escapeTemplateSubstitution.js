function escapeTemplateSubstitution(str) {
            return str.replace(templateSubstitutionRegExp, "\\${");
        }