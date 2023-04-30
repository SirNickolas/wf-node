.PHONY: all clean

CURL ?= curl
SED ?= sed

all: wf-typograf.js

clean:
	$(RM) wf.js  wf-typograf.js

wf.js:
	$(CURL) -L 'https://ru.wikipedia.org/wiki/MediaWiki:Gadget-wikificator.js?action=raw' > $@

wf-typograf.js: patch.sed  pre.js  wf.js  post.js
	$(SED) -Ef $^ > $@ && chmod +x $@
