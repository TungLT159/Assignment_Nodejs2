const API_KEY = "504b85f6fe0a10a9c7f35945e14e7ddf";
const token = "8qlOkxz4wq";

const requests = {
    fetchTrending: `http://localhost:3001/api/movies/trending?token=${token}`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `http://localhost:3001/api/movies/top-rate?token=${token}`,
    fetchActionMovies: `http://localhost:3001/api/movies/discover?genreId=28&token=${token}`,
    fetchComedyMovies: `http://localhost:3001/api/movies/discover?genreId=35&token=${token}`,
    fetchHorrorMovies: `http://localhost:3001/api/movies/discover?genreId=27&token=${token}`,
    fetchRomanceMovies: `http://localhost:3001/api/movies/discover?genreId=10749&token=${token}`,
    fetchDocumentaries: `http://localhost:3001/api/movies/discover?genreId=99&token=${token}`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

export default requests;