module.exports = function(config) {
	config.set({
		browsers: ['PhantomJS'],
		files: [
			{ pattern: 'test-context.js', watched: false }
		],
		frameworks: ['jasmine'],
		preprocessors: {
			'test-context.js': ['webpack']
		},
		webpack: {
			watch: true
		},
		webpackServer: {
			noInfo: true
		},
		reporters: ['spec'],
		plugins: [
			require('karma-webpack'),
			require('karma-jasmine'),
			require('karma-phantomjs-launcher'),
			require('karma-spec-reporter')
		]
	});
};