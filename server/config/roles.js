const Accesscontrol = require("accesscontrol");

let grantObj = {
  // in your schema roles the exact names must be used here
  //   to block access [!*]
  //   we can next check if the user can access specific functions
  //   we need a middleware to check on each profile
  user: {
    profile: {
      "create:own": ["*"],
      // we have decide what information to send back or show when user access profile
      "read:own": ["*", "!password", "!_id"],
      "update:own": ["*"],
      "delete:own": ["*"]
    }
  },
  admin: {
    profile: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"]
    },
    article: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"]
    }
  }
};

const roles = new Accesscontrol(grantObj);

module.exports = { roles };
