export interface Suvat {
	s: number;
	u: number;
	v: number;
	a: number;
	t: number;
}

export const formulas = Object.freeze({
	s: Object.freeze({
		u(d: Partial<Suvat>) {return d.v!*d.t! - 1/2*d.a!*d.t!**2},
		v(d: Partial<Suvat>) {return d.u!*d.t! + 1/2*d.a!*d.t!**2},
		a(d: Partial<Suvat>) {return d.t!/2*(d.u!+d.v!)},
		t(d: Partial<Suvat>) {return (d.v!**2-d.u!**2)/(2*d.a!)},
	}),
	u: Object.freeze({
		s(d: Partial<Suvat>) {return d.v! - d.a!*d.t!},
		v(d: Partial<Suvat>) {return (d.s! - (1/2)*d.a!*d.t!**2)/d.t!},
		a(d: Partial<Suvat>) {return 2*d.s!/d.t! - d.v!},
		t(d: Partial<Suvat>) {return (d.v!**2 - 2*d.a!*d.s!)**(1/2)},
	}),
	v: Object.freeze({
		s(d: Partial<Suvat>) {return d.u! + d.a!*d.t!},
		u(d: Partial<Suvat>) {return (d.s! + (1/2)*d.a!*d.t!**2)/d.t!},
		a(d: Partial<Suvat>) {return 2*d.s!/d.t! - d.u!},
		t(d: Partial<Suvat>) {return (d.u!**2 + 2*d.a!*d.s!)**(1/2)},
	}),
	a: Object.freeze({
		s(d: Partial<Suvat>) {return (d.v!-d.u!)/d.t!},
		u(d: Partial<Suvat>) {return 2*(d.v!*d.t!-d.s!)/(d.t!**2)},
		v(d: Partial<Suvat>) {return 2*(d.s! - d.u!*d.t!)/(d.t!**2)},
		t(d: Partial<Suvat>) {return (d.v!**2 - d.u!**2)/(2*d.s!)},
	}),
	t: Object.freeze({
		s(d: Partial<Suvat>) {return (d.v! - d.u!)/d.a!},
		u(d: Partial<Suvat>) {return (d.v! - (d.v!**2 - 2*d.a!*d.s!)**(1/2) )/d.a!},
		v(d: Partial<Suvat>) {return ((2*d.a!*d.s! + d.u!**2)**(1/2) - d.u!)/d.a!},
		a(d: Partial<Suvat>) {return (2*d.s!)/(d.u!+d.v!)},
	}),
});

export function complete(data: Partial<Suvat>): Suvat|undefined {
	// get unknowns
	const unknowns: (keyof Suvat)[] = [];
	for (const key of ["s","u","v","a","t"] as const) {
		if (!Number.isFinite(data[key])) unknowns.push(key);
	}

	// already complete
	if (unknowns.length === 0) return data as Suvat;
	
	// too many unknowns
	if (unknowns.length > 2) return undefined;

	const out = {...data};
	if (unknowns.length === 2) {
		// 2 unknowns
		out[ unknowns[0]! ] = _stripFloat(formulas[ unknowns[0]! ][ unknowns[1]! ](data));
		out[ unknowns[1]! ] = _stripFloat(formulas[ unknowns[1]! ][ unknowns[0]! ](data));
	} else {
		// 1 unknown
		out[ unknowns[0]! ] = _stripFloat(Object.values(formulas[ unknowns[0]! ])[0]!(data));
	}
	
	return out as Suvat;
}

function _stripFloat(number: number) {
	return Math.round(number * 10000000000) / 10000000000;
}