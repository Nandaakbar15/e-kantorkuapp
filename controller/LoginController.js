const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

exports.login = (req, res) => {
    res.render("login", {
        title: "Login | E-KantorKu",
        layout: "login"
    });   
}