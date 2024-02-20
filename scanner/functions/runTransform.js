function runTransform({ files, flags, transformer }) {
  const transformerPath = path.join(transformerDirectory, `${transformer}.js`)

  let args = []

  const { dry, print } = flags

  if (dry) {
    args.push("--dry")
  }
  if (print) {
    args.push("--print")
  }

  args.push("--verbose=0")

  args.push("--ignore-pattern=**/node_modules/**")
  args.push("--ignore-pattern=**/.next/**")
  args.push("--ignore-pattern=**/.cache/**")

  args.push("--extensions=tsx,ts,jsx,js,mdx")
  args.push("--parser=tsx")

  args = args.concat(["--transform", transformerPath])

  if (flags.jscodeshift) {
    args = args.concat(flags.jscodeshift)
  }

  args = args.concat(files)

  console.log(`Executing command: jscodeshift ${args.join(" ")}`)

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: "inherit",
    stripEof: false,
  })

  if (result.error) {
    throw result.error
  }
}