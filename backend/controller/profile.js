const prisma = require("../config/prisma");

/**
 *  @swagger
 *  /api/
 *    get:
 *      summary: Hello API
 *      response:
 *        200:
 *          description: Successful response
 *        500:
 *          description: Inter server error
 *
 */
exports.read = (req, res) => {
  try {
    res.send("Hello world");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.listUser = async (req, res) => {
  try {
    const userData = await prisma.user.findMany({
      take : 10
    });
    res.json(userData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
};
