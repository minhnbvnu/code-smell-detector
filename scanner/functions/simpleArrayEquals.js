function simpleArrayEquals(e,o){if(!Array.isArray(e)||!Array.isArray(o))return!0;const t=new Set(e),n=new Set(o);if(t.size!=n.size)return!1;for(const e of t)if(!n.has(e))return!1;return!0}