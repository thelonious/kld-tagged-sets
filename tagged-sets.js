#!/usr/bin/env node

var fs        = require('fs'),
    async     = require('async'),
    TaggedSet = require('./lib/TaggedSet');

var set = new TaggedSet();

if (process.argv.length >= (2 + 3)) {
    // - 2 ignores "node $0"
    // - 1 ignores the pattern at the end of the command-line
    var fileCount = process.argv.length - 2 - 1;
    var pattern = new RegExp("^" + process.argv[process.argv.length - 1] + "$");

    for (var i = 0; i < fileCount; i++) {
        var filename = process.argv[i + 2];
        var match = /^([^=]+)=(.+)$/.exec(filename);
        var tag;

        if (match) {
            filename = match[1];
            tag = match[2];
        }
        else {
            tag = String.fromCharCode(65 + i);
        }

        var text = fs.readFileSync(filename).toString();

        text.split(/\r\n?|\n/).forEach(function(item) {
            if (/^\s*$/.test(item) === false) {
                set.add(item, tag);
            }
        });
    }

    set.filter(pattern).forEach(function(line) {
        console.log(line);
    });
}
else {
    console.log("usage: tagged-sets.js <text-file>[=<tag>]{2,} <tag-pattern>");
}
