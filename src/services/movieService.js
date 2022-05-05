import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}
export function getMovies() {
  return http.get(apiEndPoint);
}
export function getMovie(movieID) {
  return http.get(movieUrl(movieID));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    console.log(body);
    return http.put(movieUrl(movie)._id, body);
  }
  console.log(movie);

  return http.post(apiEndPoint, movie);
}
export function deleteMovie(movieID) {
  return http.delete(movieUrl(movieID));
}
