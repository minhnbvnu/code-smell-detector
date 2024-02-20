function createTemplateCooked(template) {
            return template.templateFlags ? factory.createVoidZero() : factory.createStringLiteral(template.text);
        }