import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { ycombinatorNewsLink, hackerNewsLink, hoursPast } from "../../utils";

const Homepage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [topStories, setTopStories] = useState([]);

	const fetchTopStories = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`${hackerNewsLink}/v0/topstories.json`
			);
			let jsonIDs = await response.json();
			jsonIDs = jsonIDs.slice(0, 30);

			let stories = await Promise.all(
				jsonIDs.map(async (id) => {
					const response = await fetch(
						`${hackerNewsLink}/v0/item/${id}.json`
					);
					return await response.json();
				})
			);
			setTopStories(stories);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTopStories();
	}, []);

	return (
		<div className={styles.body}>
			<header className={styles.header}>
				<span className={styles.logo__icon}>Y</span>
				<div>
					<strong>Hacker News</strong>
					<ul>
						<li>
							<a href={`${ycombinatorNewsLink}/newest`}>new</a>
						</li>
						<li>
							<a href={`${ycombinatorNewsLink}/front`}>past</a>
						</li>
						<li>
							<a href={`${ycombinatorNewsLink}/newcomments`}>
								comments
							</a>
						</li>
						<li>
							<a href={`${ycombinatorNewsLink}/ask`}>ask</a>
						</li>
						<li>
							<a href={`${ycombinatorNewsLink}/show`}>show</a>
						</li>
						<li>
							<a href={`${ycombinatorNewsLink}/jobs`}>jobs</a>
						</li>
						<li>
							<a href={`${ycombinatorNewsLink}/submit`}>submit</a>
						</li>
					</ul>
				</div>
				<button className={styles.login__btn}>login</button>
			</header>
			<main className={styles.main}>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<ul className={styles.headlines}>
						{topStories.map((story) => (
							<li key={story.id} className={styles.story}>
								<a href={story.url} className={styles.title}>
									{story.title}
								</a>{" "}
								<small>
									(
									{story.url && (
										<a href={story.url}>
											{new URL(story.url).hostname}
										</a>
									)}
									)
								</small>
								<div>
									{story.score} points by{" "}
									<a
										href={`${ycombinatorNewsLink}/user?id=${story.by}`}
									>
										{story.by}
									</a>{" "}
									<a
										href={`${ycombinatorNewsLink}/item?id=${story.id}`}
									>
										{hoursPast(story.time)} hours ago
									</a>{" "}
									<a
										href={`${ycombinatorNewsLink}/hide?id=${story.id}&goto=news`}
									>
										hide
									</a>{" "}
									<a
										href={`${ycombinatorNewsLink}/hide?id=${story.id}&goto=news`}
									>
										comments
									</a>
								</div>
							</li>
						))}
					</ul>
				)}
			</main>
		</div>
	);
};

export default Homepage;
