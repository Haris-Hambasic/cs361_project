const { google } = require('googleapis');
const express = require("express");
const cors = require("cors");
const fs = require('fs');
// const bodyParser = require("body-parser");
require("dotenv").config();

// HELPER FUNCTIONS
// import { getURL } from './wiki-scraper-url-retriever.js';

const PORT = process.env.PORT || 3746;

const star_wars_application_server = express();

const simba = google.youtube({
    version: 'v3',
    auth: 'AIzaSyD9jsK33LPEyUpoOD9axlqz1Z1QFpE4OxU'
});

star_wars_application_server.use(cors());
star_wars_application_server.use(express.json());
star_wars_application_server.use(express.urlencoded({ extended: true }));
// star_wars_application_server.use(bodyParser.json());
// star_wars_application_server(bodyParser.urlencoded({ extended: true }));

const getURL = (subject) => {
    switch (subject) {
        case "Luke Skywalker":
            console.log("luke skywalker");
            return "https://en.wikipedia.org/wiki/Luke_Skywalker";
        case "Obi-Wan Kenobi":
            return "https://en.wikipedia.org/wiki/Obi-Wan_Kenobi"
        default:
            return "https://en.wikipedia.org/wiki/Never_Gonna_Give_You_Up"
    }
};

const getVideos = async (videoTitle, numVideos=25) => {
    const search = await simba.search.list({
        "part": [
          "snippet"
        ],
        "maxResults": numVideos,
        "q": videoTitle
    });

    console.log("COMPLETED");
    return search;
};

star_wars_application_server.use(`/simba/get-videos`, async (req, res) => {
    console.log("HERE -->\n");
    // getVideos(req.body.videoTitle, req.body.numVideos)
    getVideos("los angeles", 5)
        .then(val => {
            const videos = [];
            val.data.items.map(video => {
                videos.push({
                    videoIframe: `<iframe width="480" height="360" src="https://www.youtube.com/embed/${video.id.videoId}"></iframe>`,
                    videoURL: `https://www.youtube.com/embed/${video.id.videoId}`,
                    videoID: video.id.videoId,
                    videoTitle: video.snippet.title,
                    videoDescription: video.snippet.description,
                    videoThumbnail: {
                        image: video.snippet.thumbnails.high.url,
                        width: video.snippet.thumbnails.high.width,
                        height: video.snippet.thumbnails.high.height
                    }
                });
            });

            res.json(videos);
        });
});

star_wars_application_server.use("/wiki-scraper/read-data/:characterName", (req, res) => {
    console.log("CHAR NAME:", req.params["characterName"]);
    const url = getURL(req.params["characterName"]);

    fs.writeFile("./wiki_scraper/wiki_url.txt", url, (err) => {
        if (err) {
            console.log(err);
        }
    });

    fs.writeFile("./wiki_scraper/ready_check.txt", "ready", (err) => {
        if (err) {
            console.log(err);
        }
    });

    fs.readFile('./wiki_scraper/output.txt', 'utf8', (err, data) => {
        if (err) {
          console.error("Here:", err);
          return;
        }
        // console.log(data);
        res.json({ "fileContent": data });
      });
});


star_wars_application_server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
