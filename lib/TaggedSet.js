/**
 *  TaggedSet
 */
function TaggedSet() {
    this.sets = {};
}

TaggedSet.prototype.add = function(item, tag) {
    if (item in this.sets) {
        this.sets[item] += tag;
    }
    else {
        this.sets[item] = tag;
    }
};

TaggedSet.prototype.filter = function(regex) {
    var result = [];

    for (var item in this.sets) {
        if (regex.test(this.sets[item])) {
            result.push(item);
        }
    }

    return result;
};

if (typeof module !== "undefined") {
    module.exports = TaggedSet;
}
