import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/hi', (req, res) => {
	res.send('HELLO~~23123~!!!!');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
