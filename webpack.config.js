var path = require('path');

module.exports = {
	entry: {
		angularchik: "./src/angularchik.js",
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		libraryTarget: 'umd'
	}
}