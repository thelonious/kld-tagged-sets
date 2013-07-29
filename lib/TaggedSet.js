/**
 *  TaggedSet
 */
function TaggedSet() {
    this.sets = {};
}

// TODO: allow regex to be a string

/**
 *  add
 *
 *  @param {String} item
 *  @param {String} tag
 */
TaggedSet.prototype.add = function(item, tag) {
    if (typeof item === "string" && typeof tag === "string") {
        if (this.sets.hasOwnProperty(item)) {
            this.sets[item] += tag;
        }
        else {
            this.sets[item] = tag;
        }
    }
};

/**
 *  remove
 *
 *  @param {String} item
 */
TaggedSet.prototype.remove = function(item) {
    delete this.sets[item];
}

/**
 *  setItemTag
 *
 *  @param {String} item
 *  @param {String} tag
 */
TaggedSet.prototype.setTags = function(item, tag) {
    // TODO: check args
    // TODO: check item existance?
    this.sets[item] = tag;
};

/**
 *  getTags
 *
 *  @param {String} item
 */
TaggedSet.prototype.getTags = function(item) {
    return this.sets[item];
};

/**
 *  forEach
 *
 *  @pararm {Function(String)} operation
 */
TaggedSet.prototype.forEach = function(operation) {
    for (var item in this.sets) {
        operation(item);
    }
};

/**
 *  forEachMatch
 *
 *  @param {RegExp} regex
 *  @param {Boolean} negate
 *  @param {Function(String)} operation
 */
TaggedSet.prototype.forEachMatch = function(regex, negate, operation) {
    if (isRegex(regex)) {
        negate = (typeof negate === "undefined") ? false : negate;

        for (var item in this.sets) {
            if (regex.test(this.sets[item]) !== negate) {
                operation(item);
            }
        }
    }
};

/**
 *  items
 */
TaggedSet.prototype.items = function() {
    var result = [];

    this.forEach(function(item) {
        result.push(item);
    });

    return result;
};

/**
 *  filter
 *
 *  @param {RegExp} regex
 *  @param {Boolean} negate (optional)
 *  @returns {Array<String>}
 */
TaggedSet.prototype.filter = function(regex, negate) {
    var result = [];

    this.forEachMatch(regex, negate, function(item) {
        result.push(item);
    });

    return result;
};

/**
 *  prune
 *
 *  @param {RegExp} regex
 *  @param {Boolean} negate (optional)
 */
TaggedSet.prototype.prune = function(regex, negate) {
    var self = this;

    this.forEachMatch(regex, negate, function(item) {
        self.remove(item);
    });
};

// helper functions

/**
 *  isRegex
 *
 *  @param {RegExp} regex
 *  @returns {Boolean}
 */
function isRegex(regex) {
    return regex !== undefined && regex !== null && typeof regex === "object" && regex.constructor === RegExp;
}

// export

if (typeof module !== "undefined") {
    module.exports = TaggedSet;
}
