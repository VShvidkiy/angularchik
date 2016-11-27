var Scope = require('./scope');

describe('Scope', function() {
	it('can be instantiated', function(){
		var scope = new Scope();

		scope.a = 10;

		expect(scope.a).toBe(10);
	});

	/*describe('$digest', function() {
		var scope = null;

		beforeEach(function() {
			scope = new Scope();
		});

		it('calls watch callback function on $digest', function() {
			var watchCallback = jasmine.createSpy();

			scope.$watch(function() {
				return 'name';
			}, watchCallback);

			scope.$digest();

			expect(watchCallback).toHaveBeenCalled();
		});
	});*/
});