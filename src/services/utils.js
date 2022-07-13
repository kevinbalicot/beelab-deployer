const parse = function(value, container) {
    if (Array.isArray(value)) {
        return value.map(el => parse(el, container));
    }

    return String(value).replace(/{{([\w\s]+)}}/ig, function(full, group) {
        return container.get(group.trim());
    });
}

module.exports = {
    parse
};
