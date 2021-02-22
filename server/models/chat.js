const db = require('../util/database');

module.exports = class Chat {

    static test() {
        return db.execute(
            'SELECT * FROM matchs'
        )
    }
}