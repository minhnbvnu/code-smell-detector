function is_ModuleError(error) {
        return error instanceof Error && "code" in error;
    }