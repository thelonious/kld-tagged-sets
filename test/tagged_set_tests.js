var TaggedSet = require('../lib/TaggedSet');

exports.add = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');

    assert.eql(['one'], set.items());
};

exports.remove = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('one', 'b');
    set.remove('one');

    assert.eql([], set.items());
};

exports.getTags = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('one', 'b');

    assert.equal('ab', set.getTags('one'));
};

exports.setTags = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('one', 'b');
    set.setTags('one', 'cd');

    assert.equal('cd', set.getTags('one'));
};

exports.prune = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('three', 'a');
    set.add('two', 'b');
    set.add('three', 'b');
    set.prune(/^a$/);

    assert.eql(['three', 'two'], set.items().sort());
};

exports.negatedPrune = function(beforeExit, assert) {
    var set = new TaggedSet();

    set.add('one', 'a');
    set.add('three', 'a');
    set.add('two', 'b');
    set.add('three', 'b');
    set.prune(/^a+.*$/, true);

    assert.eql(['one', 'three'], set.items().sort());
};

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
