const Helpers = require('../util/Helpers')
const Geo = require('../models/geoData')
const Like = require('../models/likeData')

exports.geoOneUser = (req, res) => {
  // get location about with users id
  const { id } = req.params
  Geo.getLatLong(id).then(([loc]) => {
    loc.map((el) => {
      res.json([el.lat, el.long])
    })
  })
}

exports.index = async (req, res, next) => {
  const { cord } = req.body
  const { id } = req.params
  var data = []
  /// iiner table users with location set where in search step < 1 km
  await Geo.getAll(cord, id).then(([res]) => {
    res.map((el) => {
      data.push(el)
    })
    //     data.sort((a, b) => a.cmp - b.cmp);
  })

  res.json(data)
}

exports.likes = async (req, res, next) => {
  var data = {}, dataErr = {}
  data = { ...req.body }
  data.idLiker = req.params.id

  await Like.checkIfLiked(data).then(([like]) => {
    like.map((el) => {
      !el.lenght ? (dataErr.likeErr = "Already liked") : "";
    });
  });
  // if the user is alr
  await Like.checkIfUserisLiked(data.idLiked).then(([isLike]) => {
    console.log(isLike)
    if (Object.keys(isLike).length !== 0){
      // add this user to table match
      Like.addToTableMatch(data);
    }
  })

  if (Object.keys(dataErr).length === 0) {
    console.log(0)
    const like = new Like(null, data.idLiker, data.idLiked)
    like.save()
    // check if two users match
    res.json({status: true})
  }else
    res.json(dataErr)
}