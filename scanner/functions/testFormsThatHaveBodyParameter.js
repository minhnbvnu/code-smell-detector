function testFormsThatHaveBodyParameter(forms) {
        for (var i = 0; i < forms.length; i++) {
            MT("should indent body argument of `" + forms[i] + "` by `options.indentUnit` spaces",
                "[bracket (][keyword " + forms[i] + "] [variable foo] [variable bar]",
                "  [variable baz]",
                "  [variable qux][bracket )]"
            );
        }
    }