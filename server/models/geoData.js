const db = require('../util/database')

module.exports = class Geo {
  constructor(id, users_id, city, lat, long) {
    this.id = id
    this.users_id = users_id
    this.city = city
    this.lat = lat
    this.long = long
  }
  save() {
    return db.execute(
      'INSERT INTO location(`users_id`, `city`, `lat`, `long`) VALUES(?, ?, ?, ?)',
      [this.users_id, this.city, this.lat, this.long]
    )
  }

  static getLatLong(id) {
    return db.execute(
      'SELECT l.lat, l.long, u.type FROM location l INNER JOIN users u on u.id = l.users_id WHERE l.users_id = ?',
      [id]
    )
  }

  static getAll(cord, gender, id) {
    let setGender
    if (gender === 'Both') setGender = `u.gender = 'Male' OR u.gender = "Women"`
    else setGender = `u.gender = "${gender}"`
    return db.execute(
      `SELECT u.fameRating, l.city, u.gender, u.id, u.userName, u.firstName, u.lastName, u.age, u.bio, ST_Distance_Sphere(point(?, ?), point (l.lat , l.long)) / 1000 AS km , (SELECT COUNT(*) from tag_user t1 INNER JOIN tag_user t2 ON t1.tag_id = t2.tag_id WHERE t1.users_id = ? AND t2.users_id = u.id) as tag from users as u INNER JOIN location as l on u.id = l.users_id WHERE u.id <> ? AND ${setGender} AND NOT EXISTS (SELECT * from likes lk WHERE ? = lk.liker AND u.id = lk.liked) AND NOT EXISTS (SELECT * from blocked bl WHERE ? = bl.blocker AND u.id = bl.blocked) ORDER By u.age ,ST_Distance_Sphere(point(?,?), point (l.lat , l.long)) / 1000 ASC, u.fameRating DESC, tag DESC`,
      [cord[0], cord[1], id, id, id, id, cord[0], cord[1]]
    )
  }

  static updateGeo(data) {
    return db.execute(
      'UPDATE location SET city = ?, lat = ?, `long` = ? WHERE users_id = ?',
      [data.city, data.latlng.lat, data.latlng.lng, data.id]
    )
  }


  static updateLatlng(data) {
    return db.execute(
      'UPDATE location SET lat = ?, `long` = ? WHERE users_id = ?',
      [data.latlng.lat, data.latlng.lng, data.id]
    )
  }

  static checkLocIs(id){
    return db.execute('SELECT * FROM location WHERE users_id = ?', [id])
  }
}
