const path = require("path");

const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());

const movieRoutes = require("./routes/movie");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(movieRoutes);
app.use((req, res, next) => {
    res.status(404).send({ message: "Route not found" });
});

// app.listen(3001);

app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
    console.log("Server is running");
});