const Menu = require("../../models/menu");

function burgerController() {
  return {
    async index(req, res) {
      const burger = await Menu.find({ category: "burger" });

      return res.render("burger", { burger: burger });
    },
  };
}

module.exports = burgerController;
