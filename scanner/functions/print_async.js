function print_async(output) {
        output.print("async");
        output.space();
        output.print("function");
        print_lambda(this, output);
    }