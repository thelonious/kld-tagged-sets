var TaggedSet = require('../lib/TaggedSet');

exports.inFirstOnly = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('three', 'a');
    set.add('two', 'b');
    set.add('three', 'b');

    var result = set.filter(/^a$/);

    assert.eql(['one'], result);
};

exports.inSecondOnly = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('three', 'a');
    set.add('two', 'b');
    set.add('three', 'b');

    var result = set.filter(/^b$/);

    assert.eql(['two'], result);
};

exports.inBoth = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('three', 'a');
    set.add('two', 'b');
    set.add('three', 'b');

    var result = set.filter(/^ab$/);

    assert.eql(['three'], result);
};

exports.duplicateInFirst = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('one', 'a');
    set.add('two', 'b');

    var result = set.filter(/^a+$/);

    assert.eql(['one'], result);
};

exports.duplicateInSecond = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('two', 'b');
    set.add('two', 'b');

    var result = set.filter(/^b+$/);

    assert.eql(['two'], result);
};
