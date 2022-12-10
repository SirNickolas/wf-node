#!/usr/bin/env node
"use strict";

const window = { };

class HTMLTextAreaElement {
    innerHTML = "";

    get value() { return this.innerHTML; }
}

const document = {
    documentElement: { },
    createElement() {
        return new HTMLTextAreaElement;
    },
};

function $() { return $; }
$.on = $.when = $.done = $.getScript = $;
$.client = {profile: $};

const mw = {
    config: {
        get(key) {
            switch (key) {
                case "wgNamespaceNumber": return 0;
                case "wgServerName": return "example.com";
            }
            throw new Error(`Unknown key: '${key}'`);
        },
    },
    loader: {
        using(modules, callback) {
            if (callback != null)
                return callback();
        },
    },
};
