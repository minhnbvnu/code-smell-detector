function print_branch_body(self, output) {
        output.newline();
        self.body.forEach(function(stmt) {
            output.indent();
            stmt.print(output);
            output.newline();
        });
    }