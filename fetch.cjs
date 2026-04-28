const https = require('https');
https.get('https://aegixchain.github.io', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data.substring(0, 1000));
    const match = data.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
    if(match) console.log(match.join('\n'));
    const imgMatch = data.match(/<img[^>]+src="([^">]+)"/g);
    if (imgMatch) console.log(imgMatch.join('\n'));
  });
});
