const Menu = require("../../models/menu");

function icecreamController() {
  return {
    async index(req, res) {
      const icecream = await Menu.find({ category: "icecream" });

      return res.render("icecream", { icecream: icecream });
    },
  };
}

module.exports = icecreamController;
