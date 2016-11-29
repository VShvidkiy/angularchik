var Scope = require('./scope');

describe('Scope', function() {
	it('can be instantiated', function(){
		var scope = new Scope();
		expect(scope).toBeDefined();
	});
});