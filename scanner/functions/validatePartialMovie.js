function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}