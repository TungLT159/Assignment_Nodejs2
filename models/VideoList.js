const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "videoList.json"
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
const VideoList = {
    fetchAll(cb) {
        getProductsFromFile(cb);
    },
    findById(id, cb) {
        getProductsFromFile((videos) => {
            const video = videos.find((p) => p.id === id);
            cb(video);
        });
    },
};

module.exports = VideoList;