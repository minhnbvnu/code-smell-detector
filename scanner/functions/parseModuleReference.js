function parseModuleReference() {
                        return isExternalModuleReference2() ? parseExternalModuleReference() : parseEntityName(
                        /*allowReservedWords*/
                        false);
                    }