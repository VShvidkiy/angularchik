function Scope() {
	this.$watchers = [];
}
Scope.prototype.$watch = function(watchFn,listenerFn) {
	this.$watchers.push({
		watchFn: watchFn,
		oldValue:'init',
		oldVal:10,
		listenerFn: listenerFn
	});

}
Scope.prototype.$digest = function() {
	for(var i=this.$watchers.length-1;i>=0;i--){
		var watcher = this.$watchers[i];
		watcher.watchFn(this);
		// if (watcher.oldValue == 'init') {
		// 	watcher.oldValue = watcher.watchFn(this);
		// 	watcher.listenerFn(this);

		// }
		
		// if (watcher.oldValue != watcher.watchFn(this)) {
		// 	watcher.listenerFn(this);
		// }
		if(watcher.oldVal!==watcher.watchFn(this)){
  		   watcher.listenerFn(this);
  		}
	}
}
module.exports = Scope;