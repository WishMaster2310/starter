# Фильтры

Список встроенных фильтров [Nunjucks](https://mozilla.github.io/nunjucks/templating.html#builtin-filters)

Свои фильтры можно добавлять в папку ``` filters ```

### tls
Фильтр для перевода числа в [LocaleString](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) т.е. 10000 => 10 000

```
  так
	{{ 10000 | tls }} => 10 000 

  или так
  {{ myVar | tls('en-US') }} 

	/*
		Вернет => 10 000 (вставит пробел между разрядами)
		В качестве единственного аргумента, принимает Локаль. 
		Если не указана, то возьмет "по умолчанию" ru-RU
	*/
```

TODO: описать фильтры, и реоганизовать структуру фильтров.
