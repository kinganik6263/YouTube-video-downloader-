const youtubedl = require('youtube-dl-exec');

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send('Error: No URL provided');
    }

    const options = {
        format: 'best',
        output: '%(title)s.%(ext)s',
    };

    try {
        const videoStream = youtubedl(videoUrl, options);
        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
        videoStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to fetch video');
    }
}
