type Episode = {
	title: string;
	poster: string;
};

export type Live = {
	id: number;
	title: string;
	chanel: string;
	category: string;
	trend: boolean;
	distribution: string;
	poster: string;
};

export type Catalog = {
	id: number;
	title: string;
	chanel: string;
	category: string;
	available_replays: number;
	release_date: string;
	available_seasons: number;
	current_season: number;
	quality: string[];
	trend: boolean;
	description: string;
	distribution: string;
	poster: string;
	min_poster: string;
	episodes: Episode[];
};
