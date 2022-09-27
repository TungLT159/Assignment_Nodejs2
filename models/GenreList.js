const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "genreList.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

const GenreList = {
    fetchAll(cb) {
        getProductsFromFile(cb);
    },
    findById(id, cb) {
        getProductsFromFile((genres) => {
            const gener = genres.find((p) => p.id === id);
            cb(gener);
        });
    },
};

module.exports = GenreList;