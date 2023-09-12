const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const port = 3000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/generate-quote', async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const prompt = `Generate a quote about ${keyword}.`;

        const response = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-002/completions',
            {
                prompt,
                max_tokens: 100,  // Adjust the max_tokens to control the length of the generated quote
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        const quote = response.data.choices[0].text;
        res.status(200).send({ quote });

    }
    catch (error) {
        console.error('Error generating quote:', error);
        res.status(500).json({ error: 'An error occurred while generating the quote.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
