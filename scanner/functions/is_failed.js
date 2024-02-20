function is_failed(obj) {
        return typeof obj == "object" && obj != null && "diagnostics" in obj && obj.diagnostics != null;
    }