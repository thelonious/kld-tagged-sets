kld-collections
===============

A simple utility for discovering unique and duplicate lines of text.

Example
-------

    var TaggedSet = require('kld-collections').TaggedSet;
    var set = new TaggedSet();

    // add items for tag 'a'
    set.add('one', 'a');
    set.add('two', 'a');
    set.add('three', 'a');

    // add items for tag 'b'
    set.add('two', 'b');
    set.add('three', 'b');
    set.add('four', 'b');

    // show items in 'a' only
    console.log("A Only");
    console.log("======");
    console.log(set.filter(/^a$/));
    console.log();

    // show items in 'b' only
    console.log("B Only");
    console.log("======");
    console.log(set.filter(/^b$/));
    console.log();

    // show items in 'a' and 'b'
    console.log("A and B");
    console.log("======");
    console.log(set.filter(/^ab$/));
    console.log();
