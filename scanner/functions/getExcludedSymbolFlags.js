function getExcludedSymbolFlags(flags) {
                let result = 0;
                if (flags & 2 /* BlockScopedVariable */)
                    result |= 111551 /* BlockScopedVariableExcludes */;
                if (flags & 1 /* FunctionScopedVariable */)
                    result |= 111550 /* FunctionScopedVariableExcludes */;
                if (flags & 4 /* Property */)
                    result |= 0 /* PropertyExcludes */;
                if (flags & 8 /* EnumMember */)
                    result |= 900095 /* EnumMemberExcludes */;
                if (flags & 16 /* Function */)
                    result |= 110991 /* FunctionExcludes */;
                if (flags & 32 /* Class */)
                    result |= 899503 /* ClassExcludes */;
                if (flags & 64 /* Interface */)
                    result |= 788872 /* InterfaceExcludes */;
                if (flags & 256 /* RegularEnum */)
                    result |= 899327 /* RegularEnumExcludes */;
                if (flags & 128 /* ConstEnum */)
                    result |= 899967 /* ConstEnumExcludes */;
                if (flags & 512 /* ValueModule */)
                    result |= 110735 /* ValueModuleExcludes */;
                if (flags & 8192 /* Method */)
                    result |= 103359 /* MethodExcludes */;
                if (flags & 32768 /* GetAccessor */)
                    result |= 46015 /* GetAccessorExcludes */;
                if (flags & 65536 /* SetAccessor */)
                    result |= 78783 /* SetAccessorExcludes */;
                if (flags & 262144 /* TypeParameter */)
                    result |= 526824 /* TypeParameterExcludes */;
                if (flags & 524288 /* TypeAlias */)
                    result |= 788968 /* TypeAliasExcludes */;
                if (flags & 2097152 /* Alias */)
                    result |= 2097152 /* AliasExcludes */;
                return result;
            }