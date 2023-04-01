import { getGenres, getMovies, getRules } from "../requests/requests";

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

let response = {
  Q01: 1,
  Q02: 1,
  Q03: 1,
  Q04: 0,
};
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

const adultFilter = (movies, filter) => {
  let filteredArray;
  if (filter === ">=17") {
    filteredArray = ["R", "Not Rated", "TV-MA", "Approved"].reduce(
      (array, ageFilter) => {
        const newArray = movies.filter((movie) => {
          return !movie["rated"] || movie["rated"].includes(ageFilter);
        });
        return [...array, ...newArray];
      },
      []
    );
  } else {
    filteredArray = ["G", "PG-13", "PG"].reduce((array, ageFilter) => {
      const newArray = movies.filter((movie) => {
        return !movie["rated"] || movie["rated"].includes(ageFilter);
      });
      return [...array, ...newArray];
    }, []);
  }
  return filteredArray;
};

const yearFilter = (movies, filter) => {
  let filteredArray;
  if (filter === ">=2000") {
    filteredArray = movies.filter(
      (movie) => !movie["year"] || movie["year"] >= 2000
    );
  } else {
    filteredArray = movies.filter(
      (movie) => !movie["year"] || movie["year"] < 2000
    );
  }
  return filteredArray;
};

const ratingFilter = (movies, filter) => {
  let filteredArray;
  if (filter === ">=6") {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 6
    );
  } else if (filter === ">=7") {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 7
    );
  } else if (filter === ">=8") {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 8
    );
  }
  return filteredArray;
};

const runtimeFilter = (movies, filter) => {
  let filteredArray;
  if (filter === "<120") {
    filteredArray = movies.filter(
      (movie) => !movie["runtime"] || movie["runtime"] < 120
    );
  } else {
    filteredArray = movies.filter(
      (movie) => !movie["runtime"] || movie["runtime"] >= 120
    );
  }
  return filteredArray;
};

const languageFilter = (movies, filter) => {
  let filteredArray;
  if (filter === "English") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("English")
    );
  } else if (filter === "French") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("French")
    );
  } else if (filter === "Spanish") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("Spanish")
    );
  } else if (filter === "German") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("German")
    );
  } else if (filter === "Italian") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("Italian")
    );
  }
  return filteredArray;
};

export async function getMovieFromQuestions(response) {
  let movies = await getMovies();
  let genre = inferenceMachince(response[0]);

  const selectedMovies = movies.filter((movie) =>
    movie["genre"].includes(genre)
  );

  let fq1Movies = adultFilter(selectedMovies, response[1]);
  let fq2Movies = yearFilter(fq1Movies, response[2]);
  let fq3Movies = ratingFilter(fq2Movies, response[3]);
  let fq4Movies = runtimeFilter(fq3Movies, response[4]);
  let fq5Movies = languageFilter(fq4Movies, response[5]);

  console.log(fq5Movies[Math.floor(Math.random() * fq5Movies.length)]);
}

// getMovieFromQuestions([response, "<17", "<2000", ">=6", "<120", "Spanish"]);
