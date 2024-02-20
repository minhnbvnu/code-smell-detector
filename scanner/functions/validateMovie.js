function validateMovie (input) {
  return movieSchema.safeParse(input)
}