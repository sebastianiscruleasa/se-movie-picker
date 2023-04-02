import { getGenres, getMovies, getRules } from "../requests/requests";
import {
  adultFilter,
  languageFilter,
  ratingFilter,
  runtimeFilter,
  yearFilter,
} from "./FiltersFunctions";

export async function inferenceMachine(response) {
  const moviesRules = await getRules();
  const genres = await getGenres();
  for (const movieRule in moviesRules) {
    const moviesAnswers = moviesRules[movieRule];
    let match = true;
    for (const movieAnswer in moviesAnswers) {
      if (match) {
        if (!response || moviesAnswers[movieAnswer] !== response[movieAnswer]) {
          match = false;
        }
      }
    }
    if (match) {
      return genres[movieRule];
    }
  }
}

export async function getMovieFromQuestions(response) {
  console.log(response);
  let movies = await getMovies();
  let genre = await inferenceMachine(response[0]);
  console.log(genre);
  const selectedMovies = movies.filter((movie) =>
    movie["genre"].includes(genre)
  );

  let fq1Movies = adultFilter(selectedMovies, response[1]);
  let fq2Movies = yearFilter(fq1Movies, response[2]);
  let fq3Movies = ratingFilter(fq2Movies, response[3]);
  let fq4Movies = runtimeFilter(fq3Movies, response[4]);
  let fq5Movies = languageFilter(fq4Movies, response[5]);

  if (fq5Movies.length !== 0) {
    return fq5Movies[Math.floor(Math.random() * fq5Movies.length)];
  } else {
    return {
      title: "No movies found based on your preferences",
      imdbrating: 0,
      poster:
        "https://i.pinimg.com/originals/fd/d5/f2/fdd5f2754304c3e16bfd2788f666c9d1.gif",
    };
  }
}
