const axios = require('axios');
const url = 'https://mourits-lyrics.p.rapidapi.com/';
require('dotenv').config();

module.exports = {
    async show(req, res) {
        const { artist, song } = req.body;

        const options = {
            method: 'GET',
            url,
            params: {artist, song},
            headers: {
              'x-rapidapi-key': process.env.API_SECRET,
              'x-rapidapi-host': 'mourits-lyrics.p.rapidapi.com',
              useQueryString: true
            }
          };

        await axios.request(options).then((response) => {
            const lyric = response.data.result.lyrics.replace(/ *\[[^\]]*]/g, '');
            const formated = lyric.replace(/[^a-zA-Z0-9 ]/g, "").replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            const words = formated.replace(/(\r\n|\n|\r)/gm, " ").split(' ');
            const chars = lyric.replace(/\s/g, '').replace(/[^a-zA-Z0-9 ]/g, "").split('');
            
            const obj = {
                words: words.length,
                chars: chars.length,
                lyric
            }
            return res.send(obj)
        });
    }
}