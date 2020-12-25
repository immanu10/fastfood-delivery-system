const Menu = require("../../models/menu");

function pizzaController() {
  return {
    async index(req, res) {
      const pizza = await Menu.find({ category: "pizza" });

      return res.render("pizza", { pizza: pizza });
    },
  };
}

module.exports = pizzaController;
