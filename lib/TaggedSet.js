/**
 *  TaggedSet
 */
function TaggedSet() {
    this.sets = {};
}

TaggedSet.prototype.add = function(item, tag) {
    if (typeof item === "string" && typeof tag === "string") {
        if (item in this.sets) {
            this.sets[item] += tag;
        }
        else {
            this.sets[item] = tag;
        }
    }
};

TaggedSet.prototype.filter = function(regex) {
    var result = [];

    if (regex !== undefined && regex !== null && typeof regex === "object" && regex.constructor === RegExp) {
        for (var item in this.sets) {
            if (regex.test(this.sets[item])) {
                result.push(item);
            }
        }
    }

    return result;
};

if (typeof module !== "undefined") {
    module.exports = TaggedSet;
}
