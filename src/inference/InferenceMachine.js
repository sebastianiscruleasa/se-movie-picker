import { getGenres, getRules } from "../requests/requests";

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

// let response = {
//   Q01: 1,
//   Q02: 1,
//   Q03: 1,
//   Q04: 0,
// };
// let movieGenre = await inferenceMachince(response);

// const fs = require("fs");
// export async function getMovie(movieGenre) {
//   let moviesRawdata = fs.readFileSync("../store/movies.json");
//   let movies = JSON.parse(moviesRawdata);

//   const selectedMovies = movies.filter((movie) =>
//     movie["genre"].includes(movieGenre)
//   );
//   const pickedMovie =
//     selectedMovies[Math.floor(Math.random() * selectedMovies.length)];
//   return pickedMovie["title"];
// }

// console.log(`Genre: ${movieGenre}`);
// console.log(`Movie: ${getMovie(movieGenre)}`);
