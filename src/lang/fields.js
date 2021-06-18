const { get } = require('../util.js');
const MISSING = require('./missing_symbol.js');

class Fields {
    constructor(doc) {
        this._doc = doc;
    }

    get(path) {
        let value = MISSING;

        get(this._doc, path.pieces, (obj, field) => {
            value = obj[field];
        });

        return value;
    }

    ensure(paths) {
        for (let path of paths) {
            if (this.get(path) === MISSING) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Fields;
