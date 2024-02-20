function parseFile () {
  // var bodySnippet = 'let filename = "{Insert_File_Name}", postData = Data()\n';
  // bodySnippet += 'if let path = Bundle.main.path(forResource: filename, ofType: nil) {\n';
  // bodySnippet += `${indent}do {\n${indent.repeat(2)}postData =
  // try NSData(contentsOfFile: path, options: []) as Data\n`;
  // bodySnippet += `${indent}} catch {\n`;
  // bodySnippet += `${indent.repeat(2)}print("Failed to read from \\(String(describing: filename))")\n`;
  // bodySnippet += `${indent}}\n} else {\n`;
  // bodySnippet += `${indent}print("Failed to load file from app bundle \\(String(describing: filename))")\n}\n`;
  var bodySnippet = 'let parameters = "<file contents here>"\n';
  bodySnippet += 'let postData = parameters.data(using: .utf8)';
  return bodySnippet;
}