export const adultFilter = (movies, filter) => {
  let filteredArray;
  if (filter === 1) {
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

export const yearFilter = (movies, filter) => {
  let filteredArray;
  if (filter === 1) {
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

export const ratingFilter = (movies, filter) => {
  let filteredArray;
  if (filter === 1) {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 6
    );
  } else {
    filteredArray = movies.filter(
      (movie) => !movie["imdbrating"] || movie["imdbrating"] >= 8
    );
  }
  return filteredArray;
};

export const runtimeFilter = (movies, filter) => {
  let filteredArray;
  if (filter === 1) {
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

export const languageFilter = (movies, filter) => {
  let filteredArray;
  if (filter === 1) {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("English")
    );
  } else {
    filteredArray = movies.filter(
      (movie) => !movie["language"] || movie["language"].includes("German")
    );
  }
  return filteredArray;
};
