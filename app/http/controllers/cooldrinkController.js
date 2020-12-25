const Menu = require("../../models/menu");

function cooldrinkController() {
  return {
    async index(req, res) {
      const cooldrink = await Menu.find({ category: "cooldrink" });

      return res.render("cooldrink", { cooldrink: cooldrink });
    },
  };
}

module.exports = cooldrinkController;
