import { getGenres, getMovies, getRules } from "../requests/requests";
import {
  adultFilter,
  languageFilter,
  ratingFilter,
  runtimeFilter,
  yearFilter,
} from "./FiltersFunctions";

export async function inferenceMachince(response) {
  const moviesRules = await getRules();
  const genres = await getGenres();
  for (const movieRule in moviesRules) {
    const moviesAnswers = moviesRules[movieRule];
    let match = true;
    for (const movieAnswear in moviesAnswers) {
      if (match) {
        if (
          !response ||
          moviesAnswers[movieAnswear] !== response[movieAnswear]
        ) {
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
  let genre = await inferenceMachince(response[0]);
  console.log(genre);
  const selectedMovies = movies.filter((movie) =>
    movie["genre"].includes(genre)
  );

  let fq1Movies = adultFilter(selectedMovies, response[1]);
  let fq2Movies = yearFilter(fq1Movies, response[2]);
  let fq3Movies = ratingFilter(fq2Movies, response[3]);
  let fq4Movies = runtimeFilter(fq3Movies, response[4]);
  let fq5Movies = languageFilter(fq4Movies, response[5]);

  return fq5Movies[Math.floor(Math.random() * fq5Movies.length)];
}
