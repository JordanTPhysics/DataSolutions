import React from 'react';
import type { SVGProps } from 'react';

export function MdiSigmaLower(props: SVGProps<SVGSVGElement>, size: number) {
	return (<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24" {...props}>
		<rect
			x="2" y="2"
			width="20" height="20"
			rx="2" ry="2"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.75" />
		<path
			fill="currentColor"
			d="M 19 12 c 0 4 -3.36 8 -7.5 8 S 4 16.42 4 12 s 3.36 -8 8 -8 C 14.6667 4 19 6 20 5 v 2 c -1 1 -2.6667 0 -3 0 A 8.3 8.3 0 0 1 19 12 m -7.5 -6 C 8.46 6 6 8.69 6 12 s 2.46 6 5.5 6 s 5.5 -2.69 5.5 -6 s -2.46 -6 -5.5 -6">
		</path>
	</svg>);
}