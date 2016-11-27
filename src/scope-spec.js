var Scope = require('./scope');

describe('Scope', function() {
	it('can be instantiated', function(){
		var scope = new Scope();

		scope.a = 10;

		expect(scope.a).toBe(10);
	});
});