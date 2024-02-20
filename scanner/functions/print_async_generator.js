function print_async_generator(output) {
        output.print("async");
        output.space();
        output.print("function*");
        print_lambda(this, output);
    }