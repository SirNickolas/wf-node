.PHONY: all clean

CURL ?= curl
SED ?= sed

WIKIFICATOR := wf.js
TYPOGRAF := wf-typograf.js

all: $(TYPOGRAF)

clean:
	$(RM) $(WIKIFICATOR) $(TYPOGRAF)

$(WIKIFICATOR):
	$(CURL) -L 'https://ru.wikipedia.org/wiki/MediaWiki:Gadget-wikificator.js?action=raw' > $@

$(TYPOGRAF): patch.sed pre.js $(WIKIFICATOR) post.js
	$(SED) -Ef $^ > $@ && chmod +x $@
