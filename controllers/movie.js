const MovieList = require("../models/MovieList");
const GenreList = require("../models/GenreList");
const VideoList = require("../models/VideoList");

exports.getTrending = (req, res, next) => {
    let page = req.query.page;
    const result = [];
    MovieList.fetchAll((movie) => {
        //Sap xep theo thu tu giam dan
        movie.sort((a, b) => Number(b.popularity) - Number(a.popularity));
        if (!page) {
            page = 1;
        }
        //Phan trang cho du lieu
        for (let i = (page - 1) * 20; i < page * 20; i++) {
            result.push(movie[i]);
        }
        res.status(200).send({
            results: result,
            page: page,
            total_pages: Math.ceil(movie.length / 20),
        });
    });
};

exports.getRating = (req, res, next) => {
    let page = req.query.page;
    const result = [];
    MovieList.fetchAll((movie) => {
        //Sap xep theo thu tu giam dan
        movie.sort((a, b) => Number(b.vote_average) - Number(a.vote_average));
        if (!page) {
            page = 1;
        }
        //Phan trang cho du lieu
        for (let i = (page - 1) * 20; i < page * 20; i++) {
            result.push(movie[i]);
        }
        res.status(200).send({
            results: result,
            page: page,
            total_pages: Math.ceil(movie.length / 20),
        });
    });
};

exports.getWithGerne = (req, res, next) => {
    let page = req.query.page;
    let genreId = +req.query.genreId;
    const result = [];
    if (!page) {
        //Neu khong truyen params page thi mac dinh page = 1
        page = 1;
    }
    let genreName = "";

    MovieList.fetchAll((movies) => {
        //Truong hop nguoi dung khong truyen genreId
        if (!genreId) {
            return res.status(400).send({ message: "Not found gerneId parram" });
        }
        let data = movies.filter((movie) => {
            if (movie.genre_ids) {
                return movie.genre_ids.includes(genreId);
            }
        });
        //Truong hop khong tim duoc phim phu hop
        if (data.length === 0) {
            return res.status(400).send({ message: "Not found that gerne id" });
        }
        for (let i = (page - 1) * 20; i < page * 20; i++) {
            result.push(data[i]);
        }
        GenreList.findById(genreId, (gener) => {
            genreName = gener.name;
            return res.status(200).send({
                results: result,
                page: page,
                total_pages: Math.ceil(data.length / 20),
                genre_name: genreName,
            });
        });
    });
};

exports.postTrailer = (req, res, next) => {
    const filmId = +req.body.filmId;
    let data = [];
    let max = 0;
    console.log(filmId);
    // console.log(req);
    VideoList.findById(filmId, (videoFilm) => {
        //Truong hop nguoi dung khong truyen filmId
        if (!filmId) {
            return res.status(400).send({ message: "Not found film_id parram" });
        }
        //Truong hop film khong co video
        if (!videoFilm) {
            return res.status(404).send({ message: "Not found video" });
        }
        //Loc ra film phu hop
        const filterData = videoFilm.videos.filter((item) => {
            return (
                item.site === "YouTube" &&
                item.official === true &&
                (item.type === "Trailer" || item.type === "Teaser")
            );
        });
        filterData.forEach((item) => {
            if (item.type === "Trailer") {
                return data.push(item);
            }
        });
        if (data.length === 0) {
            data = filterData;
            data.forEach((item) => {
                let timePublished = new Date(item.published_at);
                if (timePublished.getTime() > max) {
                    max = timePublished.getTime();
                }
            });
            const result = data.filter(
                (item) => new Date(item.published_at).getTime() === max
            );
            return res.status(200).send({ result: result });
        }
        //Truong hop co nhieu hon 1 video phu hop
        if (data.length > 1) {
            data.forEach((item) => {
                let timePublished = new Date(item.published_at);
                if (timePublished.getTime() > max) {
                    max = timePublished.getTime();
                }
            });
            //Loc theo phim co thoi gian published_at gan nhat
            const result = data.filter(
                (item) => new Date(item.published_at).getTime() === max
            );
            console.log(result);
            return res.status(200).send({ result: result });
        }
        if (data.length === 0) {
            return res.status(404).send({ message: "Not found video" });
        }
    });
};

exports.postSearch = (req, res) => {
    const search = req.body.search;
    const option = +req.body.option;
    const typeFilm = req.body.type;
    let page = req.query.page;

    const result = [];
    if (!page) {
        page = 1;
    }
    //Truong hop nguoi dung khong truyen params
    if (!search) {
        return res.status(400).send({ message: "Not found keyword parram" });
    }
    MovieList.fetchAll((movies) => {
        //Loc theo tu khoa
        const data = movies.filter((movie) => {
            let movieTitle = movie.title.toLowerCase();
            let overview = "";
            if (movie.overview) {
                overview = movie.overview.toLowerCase();
            }
            return (
                movieTitle.indexOf(search.toLowerCase()) !== -1 ||
                overview.indexOf(search.toLowerCase()) !== -1
            );
        });
        if (option && (typeFilm || typeFilm !== "")) {
            const dataFilter = data.filter((movie) => {
                if (movie.genre_ids) {
                    return movie.genre_ids.includes(option);
                }
            });
            const dataType = dataFilter.filter(
                (movie) => movie.media_type === typeFilm
            );
            for (let i = (page - 1) * 20; i < page * 20; i++) {
                result.push(dataType[i]);
            }
            return res.status(200).send({
                results: result,
                page: page,
                total_pages: Math.ceil(dataType.length / 20),
            });
        }
        if (option) {
            //Loc theo the loai
            const dataFilter = data.filter((movie) => {
                if (movie.genre_ids) {
                    return movie.genre_ids.includes(option);
                }
            });
            for (let i = (page - 1) * 20; i < page * 20; i++) {
                result.push(dataFilter[i]);
            }
            return res.status(200).send({
                results: result,
                page: page,
                total_pages: Math.ceil(dataFilter.length / 20),
            });
        }
        //Loc theo loai film
        if (typeFilm || typeFilm !== "") {
            const dataFilter = data.filter((movie) => {
                return movie.media_type === typeFilm;
            });
            console.log(dataFilter);
            for (let i = (page - 1) * 20; i < page * 20; i++) {
                result.push(dataFilter[i]);
            }
            return res.status(200).send({
                results: result,
                page: page,
                total_pages: Math.ceil(dataFilter.length / 20),
            });
        }
        for (let i = (page - 1) * 20; i < page * 20; i++) {
            result.push(data[i]);
        }
        return res.status(200).send({
            results: result,
            page: page,
            total_pages: Math.ceil(data.length / 20),
        });
    });
};