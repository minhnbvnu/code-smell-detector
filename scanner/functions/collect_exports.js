function collect_exports(exported) {
        return (_context) => (root) => {
            for (const statement of root.statements) {
                if (typescript_1.default.isExportDeclaration(statement)) {
                    if (statement.isTypeOnly)
                        continue;
                    const { exportClause, moduleSpecifier } = statement;
                    if (moduleSpecifier == null || !typescript_1.default.isStringLiteral(moduleSpecifier))
                        continue;
                    const module = moduleSpecifier.text;
                    if (exportClause == null) {
                        // export * from "module"
                        exported.push({ type: "namespace", module });
                    }
                    else if (typescript_1.default.isNamespaceExport(exportClause)) {
                        // export * as name from "module"
                        const name = exportClause.name.text;
                        exported.push({ type: "namespace", name, module });
                    }
                    else if (typescript_1.default.isNamedExports(exportClause)) {
                        // export {name0, name1 as nameA} from "module"
                        const bindings = [];
                        for (const elem of exportClause.elements) {
                            bindings.push([elem.propertyName?.text, elem.name.text]);
                        }
                        exported.push({ type: "bindings", bindings, module });
                    }
                }
                else if (typescript_1.default.isExportAssignment(statement) && !(statement.isExportEquals ?? false)) {
                    // export default name
                    exported.push({ type: "named", name: "default" });
                }
                else if (typescript_1.default.isClassDeclaration(statement) || typescript_1.default.isFunctionDeclaration(statement)) {
                    const flags = typescript_1.default.getCombinedModifierFlags(statement);
                    if ((flags & typescript_1.default.ModifierFlags.Export) != 0) {
                        // export class X {}
                        // export function f() {}
                        if (statement.name != null) {
                            const name = statement.name.text;
                            exported.push({ type: "named", name });
                        }
                    }
                    else if ((flags & typescript_1.default.ModifierFlags.ExportDefault) != 0) {
                        // export default class X {}
                        // export function f() {}
                        exported.push({ type: "named", name: "default" });
                    }
                }
            }
            return root;
        };
    }