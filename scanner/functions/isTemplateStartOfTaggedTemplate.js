function isTemplateStartOfTaggedTemplate() {
                        return token() === 14 /* NoSubstitutionTemplateLiteral */ || token() === 15 /* TemplateHead */;
                    }