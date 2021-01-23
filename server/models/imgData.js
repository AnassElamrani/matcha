const db = require('../util/database');

module.exports = class Img {
  constructor(id, users_id, image, is_profil) {
    this.id = id;
    this.users_id = users_id;
    this.image = image;
    this.is_profil = is_profil;
  }
  save() {
      return db.execute(
        'INSERT INTO imgProfil(users_id, image, is_profil) VALUES(?, ?, ?)',
        [this.users_id, this.image, this.is_profil ]
      )
  }
}