const jwt = require("jsonwebtoken");
const validation = require("../Validation/validation");
const userModel=require("../model/userModel")

//<-------------------------------------< Authentication >------------------------------------->//
const UserAuthentication = function (req, res, next) {
  try {
    let bearerHeader = req.headers.authorization;

    if (typeof bearerHeader == "undefined")
      return res
        .status(400)
        .send({
          status: false,
          message: "Token is missing, please enter a token",
        });

    let bearerToken = bearerHeader.split(" ");

    let token = bearerToken[1];

    jwt.verify(token, "VaccineRegistrationApp", function (err, data) {
      if (err) {
        return res
          .status(401)
          .send({
            status: false,
            message: "Unauthenticate User or Token is invalid",
          });
      } else {
        req.decodedToken = data;
        next();
      }
    });
  } catch (err) {
    res.status(400).send({ status: false, msg: err.message })
  }
};

//<-------------------------------------< Authorization >------------------------------------->//
const UserAuthorization = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let userIdfromToken = req.decodedToken.userId;

    if (!validation.isValidObjectId(userId))
      return res
        .status(400)
        .send({
          status: false,
          message: "Please enter vaild User id in params.",
        });

    let findUser = await userModel.findOne({ _id: userId });
    if (!findUser) {
      return res
        .status(404)
        .send({ status: false, message: "User not found." });
    }
    console.log(findUser.PhoneNumber, userIdfromToken);
    if (findUser.PhoneNumber !== userIdfromToken) {
      res.status(403).send({ status: false, message: "Unauthorized access!!" });
    } else {
      next();
    }
  } catch (err) {
    res.status(400).send({ status: false, msg: err.message })
  }
};

module.exports = { UserAuthentication, UserAuthorization };
