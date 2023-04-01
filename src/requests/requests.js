const FIREBASE_URL = "https://se-movie-picker-default-rtdb.firebaseio.com/";
const RULES_URL = `${FIREBASE_URL}rules.json`;
const GENRES_URL = `${FIREBASE_URL}genres.json`;
const QUESTIONS_URL = `${FIREBASE_URL}questions.json`;
const MOVIES_URL = `${FIREBASE_URL}movies.json`;
const FILTERED_QUESTIONS_URL = `${FIREBASE_URL}filterQuestions.json`;

async function getData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function getRules() {
  return await getData(RULES_URL);
}

export async function getGenres() {
  return await getData(GENRES_URL);
}

export async function getInferenceQuestions() {
  return await getData(QUESTIONS_URL);
}

export async function getMovies() {
  return await getData(MOVIES_URL);
}

export async function getFilteredQuestions() {
  return await getData(FILTERED_QUESTIONS_URL);
}
