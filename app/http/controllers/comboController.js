const Menu = require("../../models/menu");

function comboController() {
  return {
    async index(req, res) {
      const combo = await Menu.find({ category: "combo" });

      return res.render("combo", { combo: combo });
    },
  };
}

module.exports = comboController;
