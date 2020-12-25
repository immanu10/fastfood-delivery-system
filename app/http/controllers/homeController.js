const Menu = require("../../models/menu");

function homeController() {
  return {
    async index(req, res) {
      const all = await Menu.find();

      return res.render("home", { all: all });
    },
  };
}

module.exports = homeController;
