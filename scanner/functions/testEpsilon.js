function testEpsilon() {
	  return ENGINE.backend.floatPrecision() === 32 ? TEST_EPSILON_FLOAT32 : TEST_EPSILON_FLOAT16;
	}