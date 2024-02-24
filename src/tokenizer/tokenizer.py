import sys
from transformers import AutoTokenizer


def read_file_lines(file_path):
    try:
        with open(file_path, "r") as file:
            lines = file.readlines()
        return lines
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except Exception as e:
        print(f"Error occurred: {e}")
        return None


def read_file_content(file_path):
    try:
        with open(file_path, "r") as file:
            content = file.read()
        return content
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except Exception as e:
        print(f"Error occurred: {e}")
        return None


def tokenize_line(line, tokenizer):
    code_tokens = tokenizer.tokenize(line)
    tokens_ids = tokenizer.convert_tokens_to_ids(code_tokens)
    print("\t".join(map(str, tokens_ids)))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <file>")
        sys.exit(1)

    type = sys.argv[1]
    file_path = sys.argv[2]
    tokenizer = AutoTokenizer.from_pretrained("microsoft/codebert-base")
    if type == "1d":
        file_content = read_file_content(file_path)
        if file_content is not None:
            tokenize_line(file_content, tokenizer)

    if type == "2d":
        file_lines = read_file_lines(file_path)
        if file_lines is not None:
            for line in file_lines:
                tokenize_line(line, tokenizer)

# scanner/functions/___assert_fail.js
