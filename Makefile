.PHONY: all clean

CURL ?= curl
SED ?= sed

all: wf-typograf.js

clean:
	$(RM) wf.js wf-typograf.js

wf.js:
	$(CURL) -L 'https://ru.wikipedia.org/wiki/MediaWiki:Gadget-wikificator.js?action=raw' > $@

wf-typograf.js: pre.js wf.js post.js
	$(SED) -E 's/\s+$$//; s!\<r\s*\(\s*/.*(о есть|ак как|том числе)!// &!' $^ > $@ && chmod +x $@
