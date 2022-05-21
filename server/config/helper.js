<<<<<<< HEAD
const sortArgsHelper = (sort) => {
=======
const sortArgsHelper = sort => {
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
  let sortArgs = { sortBy: "_id", order: "asc", limit: 3, skip: 0 };

  for (key in sort) {
    if (sort[key]) {
      sortArgs[key] = sort[key];
    }
  }

  return sortArgs;
};

module.exports = {
<<<<<<< HEAD
  sortArgsHelper
=======
  sortArgsHelper,
>>>>>>> 512d03ecaaef8447d2c25019bb6f1704e2bfec41
};
