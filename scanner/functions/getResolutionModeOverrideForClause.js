function getResolutionModeOverrideForClause(clause, grammarErrorOnNode) {
            if (!clause)
                return void 0;
            if (length(clause.elements) !== 1) {
                grammarErrorOnNode == null ? void 0 : grammarErrorOnNode(clause, Diagnostics.Type_import_assertions_should_have_exactly_one_key_resolution_mode_with_value_import_or_require);
                return void 0;
            }
            const elem = clause.elements[0];
            if (!isStringLiteralLike(elem.name))
                return void 0;
            if (elem.name.text !== "resolution-mode") {
                grammarErrorOnNode == null ? void 0 : grammarErrorOnNode(elem.name, Diagnostics.resolution_mode_is_the_only_valid_key_for_type_import_assertions);
                return void 0;
            }
            if (!isStringLiteralLike(elem.value))
                return void 0;
            if (elem.value.text !== "import" && elem.value.text !== "require") {
                grammarErrorOnNode == null ? void 0 : grammarErrorOnNode(elem.value, Diagnostics.resolution_mode_should_be_either_require_or_import);
                return void 0;
            }
            return elem.value.text === "import" ? 99 /* ESNext */ : 1 /* CommonJS */;
        }