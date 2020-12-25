const Menu = require("../../models/menu");

function shakesController() {
  return {
    async index(req, res) {
      const shakes = await Menu.find({ category: "shakes" });

      return res.render("shakes", { shakes: shakes });
    },
  };
}

module.exports = shakesController;
