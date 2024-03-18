type COLOR_KEYS =
	| 'brightgreen'
	| 'green'
	| 'yellowgreen'
	| 'yellow'
	| 'orange'
	| 'red'
	| 'blue'
	| 'lightgrey'
	| 'success'
	| 'important'
	| 'critical'
	| 'infomational'
	| 'inactive'
	| 'blueviolet';

type COLORS_TYPE = {
	[key in COLOR_KEYS]?: string;
};

const COLORS: COLORS_TYPE = {
	brightgreen: '#52c435',
	green: '#97c232',
	yellowgreen: '#a1a237',
	yellow: '#d7af3b',
	orange: '#f17f4a',
	red: '#d5624f',
	blue: '#2082bf',
	lightgrey: '#9e9e9e',
	success: '#52c434',
	important: '#f17f4a',
	critical: '#d56250',
	infomational: '#2183c0',
	inactive: '#9e9e9e',
	blueviolet: '#8b42d9',
};

interface BadgeLogOptions {
	title: string;
	content: string;
	color?: COLOR_KEYS;
}

export const badgeLog = (options: BadgeLogOptions) => {
	const { title, content, color = 'blue' } = options;
	const formattedColor = COLORS[color] || color;

	const format = [
		'%c '.concat(title, ' %c ').concat(content, ' '),
		'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: '.concat(
			'#606060',
			';'
		),
		'padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: '.concat(
			formattedColor,
			';'
		),
	];
	console.log.apply(console, format);
};
