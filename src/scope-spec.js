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

		it('calls the listener function of a watch on first digest', function(){
			var spy = jasmine.createSpy();

			scope.a = 10;

			scope.$watch(function(scope) {
				return scope.a;
			}, spy);

			scope.$digest();

			expect(spy).toHaveBeenCalled();
		});

		it('passes scope to the watch function', function(){
			var spy = jasmine.createSpy();

			scope.$watch(spy, function() {
				//pass
			});

			scope.$digest();

			expect(spy).toHaveBeenCalledWith(scope);
		});

		it('calls listener fn only when data are really changed', function(){
			scope.a       = 10;
			scope.counter = 0;

			var listenerFn = function(newValue, oldValue, scope) {
				scope.counter++;
			}

			var watchFn = function(scope) {
				return scope.a;
			}

			scope.$watch(watchFn, listenerFn);

			expect(scope.counter).toBe(0);

			scope.$digest();

			expect(scope.counter).toBe(1);

			scope.$digest();

			expect(scope.counter).toBe(1);

			scope.a = 0;

			scope.$digest();

			expect(scope.counter).toBe(2);
		});

		xit('calls listener when watch value is first undefined', function() {  
			scope.counter = 0;  

			scope.$watch(function(scope) { 
				return scope.someValueThatReturnsUndefined; 
			}, function(newValue, oldValue, scope) { 
				scope.counter++; 
			});

			scope.$digest();

			expect(scope.counter).toBe(1);
		}); 

		xit('may have watchers that omit the listener function', function() {  
			var watchFn = jasmine.createSpy().and.returnValue('something');  

			scope.$watch(watchFn);

			scope.$digest();

			expect(watchFn).toHaveBeenCalled(); 
		});

		xit('triggers chained watchers in the same digest', function() {  
			scope.name = 'Platon';  

			scope.$watch(function(scope) { 
				return scope.nameUpper; 
			}, function(newValue, oldValue, scope) {
				if (newValue) {
					scope.initial = newValue.substring(0, 1) + '.';
				}
			});  

			scope.$watch(function(scope) { 
				return scope.name; 
			}, function(newValue, oldValue, scope) {
				if (newValue) {
					scope.nameUpper = newValue.toUpperCase();
				}
			});

			scope.$digest();

			expect(scope.initial).toBe('P.');

			scope.name = 'Aline';

			scope.$digest();

			expect(scope.initial).toBe('A.'); 
		});

		xit('gives up on the watches after 10 iterations', function() {  
			scope.counterA = 0; 
			scope.counterB = 0;

			scope.$watch(function(scope) { 
				return scope.counterA; 
			}, function(newValue, oldValue, scope) {
				scope.counterB++;
			});

			scope.$watch(function(scope) { 
				return scope.counterB; 
			}, function(newValue, oldValue, scope) {
				scope.counterA++;
			});

			expect((function() { 
				scope.$digest();
			})).toThrow();
		});

		xit('compares based on value if enabled', function() {
			scope.aValue = [1, 2, 3];
			scope.counter = 0;

			scope.$watch(function(scope) {
				return scope.aValue;
			}, function(newValue, oldValue, scope) {
				scope.counter++;
			}, true);

			scope.$digest();

			expect(scope.counter).toBe(1);

			scope.aValue.push(4);

			scope.$digest();

			expect(scope.counter).toBe(2);
		});

		xit('correctly handles NaNs', function() {
			scope.number = 0 / 0; //NaN
			scope.counter = 0;

			scope.$watch(function(scope) {
				return scope.number;
			}, function(newValue, oldValue, scope) {
				scope.counter++;
			});

			scope.$digest();

			expect(scope.counter).toBe(1);

			scope.$digest();

			expect(scope.counter).toBe(1);
		});

		xit('catches exceptions in watch functions and continues', function() {
			scope.aValue = 'abc';
			scope.counter = 0;

			scope.$watch(function(scope) {
				throw 'Error';
			}, function(newValue, oldValue, scope) {});

			scope.$watch(function(scope) {
				return scope.aValue;
			}, function(newValue, oldValue, scope) {
				scope.counter++;
			});

			scope.$digest();

			expect(scope.counter).toBe(1);
		});

		xit('catches exceptions in listener functions and continues', function() {
			scope.aValue = 'abc';
			scope.counter = 0;

			scope.$watch(function(scope) {
				return scope.aValue;
			}, function(newValue, oldValue, scope) {
				throw 'Error';
			});

			scope.$watch(function(scope) {
				return scope.aValue;
			}, function(newValue, oldValue, scope) {
				scope.counter++;
			});

			scope.$digest();

			expect(scope.counter).toBe(1);
		});

		xit('allows destroying a $watch with a removal function', function() {
			scope.aValue = 'abc';
			scope.counter = 0;

			var destroyWatch = scope.$watch(function(scope) {
				return scope.aValue;
			}, function(newValue, oldValue, scope) {
				scope.counter++;
			});

			scope.$digest();

			expect(scope.counter).toBe(1);

			scope.aValue = 'def';

			scope.$digest();

			expect(scope.counter).toBe(2);

			scope.aValue = 'ghi';

			destroyWatch();

			scope.$digest();

			expect(scope.counter).toBe(2);
		});

		xit('allows destroying a $watch during digest', function() {
		});

		xit('allows destroying several $watches during digest', function() {

		});
	});
});