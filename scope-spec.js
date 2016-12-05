var Scope = require('./scope');

describe('Scope', function() {
	it('can be instantiated', function(){
		var scope = new Scope();
		expect(scope).toBeDefined();
	});

	describe('digest', function() {
		var scope = null;

		beforeEach(function() {
			scope = new Scope();
		});

		it('calls the listener function of a watch', function(){
			var spy = jasmine.createSpy();

			scope.$watch(function(scope) {
				return scope.a;
			}, spy);

			scope.$digest();

			expect(spy).toHaveBeenCalled();
		});

		it('passed scope to the watch function', function(){
			var spy = jasmine.createSpy();

			scope.$watch(spy, function() {
				
			});

			scope.$digest();

			expect(spy).toHaveBeenCalledWith(scope);
		});

		it('calls listener fn only when data are really changed', function(){
			scope.a       = 10;
			scope.counter = 0;
			var e = scope.a;
			
			var listenerFn = function() {
				 scope.counter++;
			}

			var watchFn = function(scope) {
				return scope.a
			}

			scope.$watch(watchFn, listenerFn);

			// expect(scope.counter).toBe(0);

			// scope.$digest();

			// expect(scope.counter).toBe(1);

			// scope.$digest();

			// expect(scope.counter).toBe(1);

			// scope.a = 0;

			// scope.$digest();

			// expect(scope.counter).toBe(2);
			expect(scope.counter).toBe(0);

			scope.$digest();

			expect(scope.counter).toBe(0);

			scope.$digest();

			expect(scope.counter).toBe(0);

			scope.a = 0;

			scope.$digest();

			expect(scope.counter).toBe(1);
		});
	});
});