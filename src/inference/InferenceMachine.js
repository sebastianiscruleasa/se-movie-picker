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

const adultFilter = (movies) => {
  let filteredArray;
  if (response[1] === ">=17") {
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

const yearFilter = (movies) => {
  let filteredArray;
  if (response[2] === ">=2000") {
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

const ratingFilter = (movies) => {
  let filteredArray;
  if (response[3] === ">=6") {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 6
    );
  } else if (response[3] === ">=7") {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 7
    );
  } else if (response[3] === ">=8") {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 8
    );
  }
  return filteredArray;
};

const runtimeFilter = (movies) => {
  let filteredArray;
  if (response[4] === "<120") {
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

const languageFilter = (movies) => {
  let filteredArray;
  if (response[5] === "English") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("English")
    );
  } else if (response[5] === "French") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("French")
    );
  } else if (response[5] === "Spanish") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("Spanish")
    );
  } else if (response[5] === "German") {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("German")
    );
  } else if (response[5] === "Italian") {
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

  let fq1Movies = adultFilter(selectedMovies);
  let fq2Movies = yearFilter(fq1Movies);
  let fq3Movies = ratingFilter(fq2Movies);
  let fq4Movies = runtimeFilter(fq3Movies);
  let fq5Movies = languageFilter(fq4Movies);

  console.log(fq5Movies[Math.floor(Math.random() * fq5Movies.length)]);
}

// getMovieFromQuestions([response, "<17", "<2000", ">=6", "<120", "Spanish"]);
