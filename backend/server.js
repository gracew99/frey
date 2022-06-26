
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
  res.setHeader("Access-Control-Allow-Headers", "*"),
  next();
})

const axios = require("axios")
const audioURL = "https://bit.ly/3yxKEIY"
const APIKey = "6966b1883c7e4e1ba09bf4f684ec95c9"

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
  },
})

const refreshInterval = 5000



app.post('/audio', async (req, res) => {
    console.log("RECEIVED")
    console.log("ok...")
    const transcript = await getTranscript(res)


  });

const getTranscript = async (res) => {
    // Sends the audio file to AssemblyAI for transcription
    const response = await assembly.post("/transcript", {
      audio_url: audioURL,
    })
  
    // Interval for checking transcript completion
    const checkCompletionInterval = setInterval(async () => {
      const transcript = await assembly.get(`/transcript/${response.data.id}`)
      const transcriptStatus = transcript.data.status
  
      if (transcriptStatus !== "completed") {
        console.log(`Transcript Status: ${transcriptStatus}`)
      } else if (transcriptStatus === "completed") {
        console.log("\nTranscription completed!\n")
        let transcriptText = transcript.data.text
        console.log(`Your transcribed text:\n\n${transcriptText}`)
        clearInterval(checkCompletionInterval)
        res.send({
            transcript: transcriptText
        })
      }
    }, refreshInterval)
  }
  
  


  app.listen(process.env.PORT || 8000, () =>
  console.log(`Express server is running on localhost:${process.env.PORT || 8000}`)
);