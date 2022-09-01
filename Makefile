install: #установка зависимостей
	npm ci

gendiff: #запуск файла gendiff.js через make gendiff
	node bin/gendiff.js

publish: #добавление учебного пакета (не в основной каталог NPM)
	npm publish --dry-run

test: #запуск тестов
	npx jest

lint: #проверка линтером
	npx eslint .

test-coverage: #покрытие тестами
	npx jest --coverage
