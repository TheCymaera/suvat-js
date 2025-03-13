# SUVAT
A small TypeScript/JavaScript library for solving the SUVAT equations.

## Installation
Install via [npm](https://www.npmjs.com/package/suvat):
```shell
npm install suvat
```

## Example usage
```typescript
import * as suvat from "suvat";

// enter 3 known variables to find the other 2
const completed = suvat.complete({
	s: 1,
	u: 2,
	v: 3,
});

// use a specific formula
// - solve for s, with u as the 2nd unknown.
const s = suvat.formulas.s.u({
	v: 3,
	a: 4,
	t: 5,
});
```