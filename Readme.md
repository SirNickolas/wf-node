# Типограф

Основан на [Викификаторе][wf] из русской Википедии, но работает не в браузере, а в окружении
[Node.js][node-js]. Содержит меньше багов, чем типограф Лебедева; работает полностью на локальной
машине — ваши тексты не отправляются ни на какой сервер.

[wf]: https://ru.wikipedia.org/wiki/Википедия:Викификатор
[node-js]: https://nodejs.org


## Использование

```shell
./wf-typograf.js < input.txt > output.txt
```


## Обновление

Чтобы обновить скрипт Викификатора до [последней версии][wf-history], выполните следующую команду:

```shell
make -B
```

[wf-history]: https://ru.wikipedia.org/w/index.php?action=history&title=MediaWiki:Gadget-wikificator.js
