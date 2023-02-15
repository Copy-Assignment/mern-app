const express = require('express');
const dotenv = require("dotenv")
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
var cors = require('cors')
app.use(cors())

const { Configuration, OpenAIApi } = require("openai");

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

const configuration = new Configuration({
    apiKey: process.env.OPENAIKEY,
});
const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
    res.status(200);

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        max_tokens: 2000,
        prompt: 'Holy quran answer to - ' + req.body.question,
    })
    res.send(completion.data.choices[0].text);
});

if (process.env.NODE_ENV == "production") {
    app.use(express.static("chat-quran-gpt/build"));
}

app.listen(PORT, () => {
    console.log("Server running successfully on " + PORT);
});