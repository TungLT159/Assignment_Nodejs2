const express = require("express");

const movieController = require("../controllers/movie");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/api/movies/trending", isAuth, movieController.getTrending);

router.get("/api/movies/top-rate", isAuth, movieController.getRating);

router.get("/api/movies/discover", isAuth, movieController.getWithGerne);

router.post("/api/movies/video", isAuth, movieController.postTrailer);

router.post("/api/movies/search", isAuth, movieController.postSearch);

module.exports = router;