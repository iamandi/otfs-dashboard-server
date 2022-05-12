const { Files, filesDb } = require("./file")

const Like = {};

// FAVORITES
Like.getAll = () => {
  const res = filesDb.filter(element => element.like === true);
  return res;
}

Like.findOneById = (id) => {
  const file = filesDb.find(element => element.id === id && element.like === true);
  console.log('>>file', file)
  return file;
}

Like.findOneByIdAndUpdate = (id, like) => {
  console.log({ id, like });
  const file = Files.findOneById(id);
  file.like = like;

  return filesDb.find(element => element.id === id);
}

exports.Like = Like;