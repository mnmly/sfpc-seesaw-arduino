SRC = $(wildcard lib/*/*.js)
STYL = $(wildcard lib/*/*.styl)
JSON = $(wildcard lib/*/component.json)

serve:
	@NODE_PATH=lib n use 0.10.25 index.js

install: package.json
	@npm install

clean:
	rm -fr build components

.PHONY: clean
