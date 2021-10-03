type Episode = {
	title: string;
	poster: string;
};

export type Live = {
	id: number;
	title: string;
	chanel: string;
	category: string;
	available_replays: number;
	description: string;
	trend: boolean;
	distribution: string;
	distribution_logo: string;
	trailer: string;
	poster: string;
	release_date: string;
	new: boolean;
	quality: string[];
	episodes: Episode[];
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
	new: boolean;
	description: string;
	distribution: string;
	distribution_logo: string;
	trailer: string;
	poster: string;
	min_poster: string;
	episodes: Episode[];
};
