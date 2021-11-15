'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const dbData = await ctx.model.Student.findAll();
    let rsp = `hi, egg, we got ${dbData.length} students\n\n`;
    dbData.forEach((st, index) => {
      rsp += `${index + 1}. ${st.name}: ${st.age} \n`;
    });
    ctx.body = rsp;

  }
}

module.exports = HomeController;
