window.wfPluginsT.push((txt, r) => {
    // In wiki markup, space at BOL denotes a code block. In prose, it is garbage.
    r(/^[ \t\xA0]+/gm, "");
    // Latin letters with diacritics in a Cyrillic word.
    const cyrillics = {
        0xC1: 'А\u0301',
        0xC9: 'Е\u0301',
        0xCB: 'Ё',
        0xD3: 'О\u0301',
        0xDA: 'И\u0301',
        0xDD: 'У\u0301',
        0xE1: 'а\u0301',
        0xE9: 'е\u0301',
        0xEB: 'ё',
        0xF3: 'о\u0301',
        0xFA: 'и\u0301',
        0xFD: 'у\u0301',
    };
    r(/([а-яё])([áéëóúý]+)|([áéëóúý]+)(?=[а-яё])/gi, (m0, m1, m2, m3) => {
        m1 || (m1 = "");
        m2 || (m2 = m3);
        for (let i = 0; i < m2.length; i++)
            m1 += cyrillics[m2.charCodeAt(i)];
        return m1;
    });
});
window.wfPlugins.push((txt, r) => {
    // Н. э.
    r(/((?:^|[^\wа-яё’\u0301-])н)\.\s?(?=э\.)/gi, "$1.\xA0");
    // Т. е., т. к..
    r(/((?:^|[^\wа-яё’\u0301-])т)\.\s?(?=[ек]\.)/gi, "$1.\xA0");
    // В т. ч.
    r(/((?:^|[^\wа-яё’\u0301-])в)\s(т)\.\s?(?=ч\.)/gi, "$1\xA0$2.\xA0");
    // 1- and 2-letter words followed by punctuation should be preceded by a non-breaking space.
    r(/ (?=[\wа-яё]{1,2}[?!.…,;:"])/gi, '\xA0');
    // 1- and 2-letter words should be followed by a non-breaking space.
    r(/(?:^|[^\wа-яё’\u0301-])[\wа-яё]{1,2}(?=[ \xA0])/gi, "$&\xA0");
    r(/\xA0[ \xA0]/g, '\xA0');
    // But particles should be preceded by a non-breaking space instead.
    r(/((?:[ \xA0](?:бы?|же?|л[иь]))+)\xA0/gi, (m0, m1) => m1.replace(/ /g, '\xA0') + ' ');
    // Punctuation should be followed by a regular space.
    r(/([?!.…,;:"—])\xA0/g, "$1 ");
    // Dash should always be preceded by a non-breaking space.
    r(/ —/g, "\xA0—");
    // Dash at BOL should be followed by a narrow non-breaking space.
    r(/^— /gm, "—\u202F");
    // If a line consists of only '#', '*', and ':', the Wikificator will append a space to it.
    r(/[ \xA0]+$/gm, "");
});

(async () => {
    const chunks = [ ];
    for await (const chunk of process.stdin)
        chunks.push(chunk);
    process.stdout.write(window.Wikify(Buffer.concat(chunks).toString("utf8")));
})();
