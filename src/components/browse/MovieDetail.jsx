import React from "react";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import "./MovieDetail.css";


const MovieDetail = ({ movieData }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  const { id, release_date, title, name, overview, vote_average } = movieData;
  useEffect(() => {
    console.log(id);
    async function fetchTrailer() {
      await axios
        .post("http://localhost:3001/api/movies/video", {
          filmId: id,
          token: "8qlOkxz4wq",
        })
        .then((data) => {
          console.log("đâsdasdasd", data.data.result[0]);
          if (data.data.result[0]) {
            setTrailerUrl(
              `https://www.youtube.com/embed/${data.data.result[0].key}`
            );
          }
        });
    }
    fetchTrailer();
  });

  return (
    <div className="movie_detail">
      <div className="movie_detail_data">
        <h1>{title || name}</h1>
        <hr></hr>

        <h3>Release Date: {release_date}</h3>
        <h3>Vote: {vote_average} / 10</h3>
        <br></br>
        <p>{overview}</p>
      </div>
      <div className="movie_detail_trailer">
        <iframe
          title="trailer"
          width="100%"
          height="400"
          style={{ border: "none" }}
          src={trailerUrl}></iframe>
      </div>
    </div>
  );
};

export default MovieDetail;
