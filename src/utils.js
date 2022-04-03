export const ycombinatorNewsLink = "https://news.ycombinator.com";
export const hackerNewsLink = "https://hacker-news.firebaseio.com";
export const hoursPast = (time) => {
	const diff = Date.now() - time * 1000;
	const hours = Math.floor(diff / (1000 * 60 * 60));
	return hours;
};
