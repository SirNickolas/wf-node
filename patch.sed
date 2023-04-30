#!/bin/sed -Ef

# Strip trailing spaces.
s/\s+$//
# Do not de-abbreviate these.
s:\<r\s*\(\s*/.*(о есть|ак как|том числе).*:// & // PATCHED:
# Hyphen-to-dash conversion should trigger before any whitespace character, not just U+0020.
s:\<(r\s*\(\s*/\(\\s\)-\{1,3\}) (/.*—) (.*):\1(?!\\S)\2\3 // PATCHED:
