module.exports = {
    parse(value, container) {
        return String(value).replace(/{{([\w\s]+)}}/ig, function(full, group) {
            return container.get(group.trim());
        });
    }
};
