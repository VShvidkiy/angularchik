Angular
======

![Структура ангулара](https://s3.eu-central-1.amazonaws.com/assets.tich.io/ng/angular.png)

Scope
--------

Scope является центральной и ключевой концепцией в ангуларе. Имено с него мы и начнем нашу реализацию.

Основное назначение скоупа это отслеживание изменений в данных. Помимо этого он используется для передачи информации между контроллерами и директивами, так же, является основой событийной системы ангулара.

Именно та легкость, с которой происходит отслеживание изменений в данных, либо попросту -- *data-binding*,  дала ангулару его популярность.

###Data-Binding

Сама идея дата-биндинга не нова. Еще со временен `document.getElementById` и jquery существовали приемы одностороннего связывания данных.

####Односторонний биндинг

Рассмотрим пример одностороннего связывания данных с использованием [VanillaJS](http://vanilla-js.com/):

```
var personNameEl = document.getElementById('id_personName');
var helloTextEl  = document.getElementById('');

personNameEl.onchange = function(e) {
  helloTextEl.innerText = 'Hello, ' + e.target.value;
}
```
Пример можно посмотреть тут: [https://jsbin.com/yoyudin/edit?html,js,output](https://jsbin.com/yoyudin/edit?html,js,output)

Как только вы введете значание в поле ввода `id_personName`, `hello_text` изменит свое значение.

####Двустороннее связывание

Под двусторонним связыванием обычно понимают обновление данных при обновлении значений в дом елементах, и обновление дома при обновлении данных.

[https://jsbin.com/dubafa/edit?html,js,output](https://jsbin.com/dubafa/edit?html,js,output)

Здесь, доступ к переменной `_name` осуществляется через методы `getName` и `setName` соответственно. И при вызове метода `setName` мы знаем что данные поменялись, и нужно обновить дом.

В итоге эти идеи эволюционировали в огромное колличество фреймворков для дата-биндинга. Они абстрагировали в себе функциональность добавления слушателя к дом елементу, который срабатывал при изменении значения в елементе, и обновлении елемента при вызове функции обновления данных.

Отличным примером таких реализаций является [KnockoutJS](http://knockoutjs.com/).

####Dirty checking

#####$watch и $digest

Dirty checking -- это вид биндинга, в котором происходит периодическая проверка данных на измененность.

К примеру, у нас есть переменная `а`, которой присвоено значение 10. И после вызова какойто функции мы хотим проверить поменялось ли значение `а`?

```
var a = 10;

var oldA = a;
//some code here

if (a !=== oldA) {
//a has been changed
}
```

Функция `$watch`, как раз и реализует такую проверку.

```
var dataToWatchFn = function(scope) {
  return scope.a;
};

var watchListener = function(newData, OldData, scope) {
  //data has been changed
};

scope.$watch(dataToWatchFn, watchListener);
```

Внутри, у скоупа есть массив $$watchers, в который добавляются аргументы переданные в метод `$watch`

```
Scope.prototype.$watch = function(watchFn, listenerFn) {
	this.$watchers.push({
		watchFn: watchFn,
		listenerFn: listenerFn
	});
};
```

Как говорилось раньше, Dirty checking -- это вид биндинга, в котором происходит периодическая проверка данных на измененность.
В ангуларе, такую проверку запускает функция `$digest`. Ее задача пройтись по всем вотчерам, выполнить функцию `watchFn`, только если данные поменялись, и в случае их изменения, вызвать `listenerFn`. Ниже представлена наивная реализация:

```
Scope.prototype.$digest = function() {
	for (var i = this.$watchers.length - 1; i >= 0; i--) {
		var watcher = this.$watchers[i];

		watcher.watchFn(this);
		watcher.listenerFn(this);
	}
};
```

