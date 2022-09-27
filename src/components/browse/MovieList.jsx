import React, { useState, useEffect } from "react";
import MovieDetail from "../../components/browse/MovieDetail";
import "./MovieList.css";

const base_url = "https://image.tmdb.org/t/p/original";
const movies_limit = 15;

function MovieList({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // async function fetchData() {
    // 	const request = await axios.get(fetchUrl);
    // 	console.log(request.data.results);
    // 	setMovies(request.data.results);
    // 	return request;
    // }
    // fetchData();
    fetch(fetchUrl)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      })
      .catch((error) => console.log(error));
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  // movies.sort((a, b) => b.popularity - a.popularity);
  movies.splice(movies_limit);

  return (
    <div className="row">
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies.map((movie,index) => {
          return (
            <img
              key={index}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {selectedMovie && (
          <MovieDetail movieData={selectedMovie}  />
        )}
      </div>
    </div>
  );
}

export default MovieList;
