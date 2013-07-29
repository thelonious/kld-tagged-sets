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

exports.undefinedItem = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add(undefined, 'a');

    var result = set.filter(/.*/);

    assert.eql([], result);
};

exports.nullItem = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add(null, 'a');

    var result = set.filter(/.*/);

    assert.eql([], result);
};

exports.undefinedTag = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', undefined);

    var result = set.filter(/.*/);

    assert.eql([], result);
};

exports.nullTag = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', null);

    var result = set.filter(/.*/);

    assert.eql([], result);
};

exports.undefinedPattern = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('one', 'b');

    var result = set.filter(undefined);

    assert.eql([], result);
};

exports.nullPattern = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('one', 'b');

    var result = set.filter(null);

    assert.eql([], result);
};

exports.nonRegexPattern = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('one', 'b');

    var result = set.filter('a');

    assert.eql([], result);
};
