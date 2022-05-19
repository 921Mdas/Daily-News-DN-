const { StatusCodes } = require("http-status-codes");
const { roles } = require("../config/roles");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      // middlewares can pass values to the next function through the req keyword
      // req.user or req.name, etc.
      // const user = res.locals.userData;
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: "You dont have permission",
        });
      }
      // permission filter not working well
      res.locals.permission = permission;
      next();
    } catch (err) {
      next(err);
    }
  };
};
