function shouldRescanTemplateToken(container) {
                return container.kind === 16 /* TemplateMiddle */ || container.kind === 17 /* TemplateTail */;
            }