const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const directoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebaars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve (tehe root)
app.use(express.static(directoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Igor Van-Dúnem"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Igor Van-Dúnem"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful",
    title: "Help",
    name: "Igor Van-Dúnem"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address || typeof req.query.address != "string") {
    return res.send({
      mgs: "You must provide a address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          forecast,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    product: []
  });
});

// Setup the Error 404 Pages
app.get("/help/*", (req, res) => {
  res.render("error-404", {
    title: "Sorry.. Article a not found",
    mgs: "Help article not found!"
  });
});
app.get("*", (req, res) => {
  res.render("error-404", {
    title: "Sorry.. Page not found",
    mgs: "Error 404: Page not found"
  });
});

app.listen(port, () => {
  console.log("Server Up => Port " + port);
});
