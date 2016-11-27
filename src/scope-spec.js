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

		it('calls watch callback with scope as its argument', function() {
		});

		it('calls watch callback when the scope value changed', function() {
		});

		it('triggers chained watchers', function() {
		});

		it('throws an error when infinite loop detected', function() {
		});

		it('is optimized', function() {
		});

		it('equality', function() {
		});

		it('NaN', function() {
		});

		it('can destroy a watch', function() {
		});

		it('can destroy itself', function() {
		});
	});*/
});