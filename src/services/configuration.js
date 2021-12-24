const { parse } = require('./utils');

const container = {
    _items: {},

    set(key, value) {
        container._items[key] = value;
    },

    get(key, def = undefined) {
        if (undefined === container._items[key] && undefined === def) {
            throw new Error(`${key} doesn't exists`);
        }

        return undefined !== container._items[key] ? parse(container._items[key], container) : def;
    },
};

module.exports = container;
