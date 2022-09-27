import React, { useState, useEffect } from "react";

import axios from "../../utils/axios";

import "./SearchResult.css";

const base_url = "https://image.tmdb.org/t/p/original";

const SearchResult = ({ query, option, type }) => {
  const [movies, setMovies] = useState([]);

  const url = "http://localhost:3001/api/movies/search";
  console.log(option);
  useEffect(() => {
    async function fetchData() {
      await axios
        .post(url, {
          option: option,
          search: query,
		  type: type,
          token: "8qlOkxz4wq",
        })
        .then((res) => {
          console.log(res.data.results);
          const data = res.data.results.filter((item) => item !== null);
          setMovies(data);
        });
    }

    if (query) {
      fetchData();
    } else {
      setMovies([]);
    }
  }, [url, query, option, type]);

  return (
    <div className="row">
      <h2>Search Result</h2>
      <div className="row_posters search-resul-container sc2">
        {movies.map((movie, index) => {
          return (
            <img
              key={index}
              className={`row_poster row_posterLarge`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
