
const mongoose = require("mongoose");


// module.exports.isValid = function () {
//   if (typeof value == "string" && value.trim().length == 0) {

//     return false;
//   }
//   return true;
// };





//__________________________ Validations : Name ___________________________________________

const isValidName = function (name) {
  const fnameRegex = /^([a-zA-Z])+$/;
  return fnameRegex.test(name);
};

//__________________________ Validations : Email  ___________________________________________

const isValidEmailId = function (email) {
  const emailRegex =
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
  return emailRegex.test(email);
};

//__________________________ Validations : Password  ___________________________________________

const isValidPassword = function (password) {
  const passwordRegex =
  /^(?=.*?[A-Za-z0-9#?!@$%^&*-]).{8,15}$/;
  return passwordRegex.test(password);
};
//__________________________ Validations : Phone ___________________________________________

const isValidPhone = function (PhoneNumber) {
  const MobileRegex =
  /^[0]?[6789]\d{9}$/;
  return MobileRegex.test(PhoneNumber);
};
//__________________________ Validations : Values ___________________________________________

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value == "string" && value.trim().length === 0) return false;
  return true;
};

//__________________________ Validations :  ObjectId ___________________________________________

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};
//__________________________ Validations :  PinCode ___________________________________________

const isValidPincode = function (pincode) {
  const PinCodeRegex =
  /^[1-9]{1}[0-9]{5}$/;;
  return PinCodeRegex.test(pincode);
};
//__________________________ Validations :  PinCode ___________________________________________

const isValidTitle = function (title) {
  const TitleRegex =
  /^([a-zA-Z 0-9])+$/;
  return TitleRegex.test(title);
};
//__________________________ Export : Modules  ___________________________________________

module.exports = {
 
  isValid,
  isValidEmailId,
  isValidName,
  isValidPassword,
  isValidObjectId,
  isValidPhone,
  isValidPincode,
  isValidTitle
};