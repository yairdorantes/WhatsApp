import Users from "../../../models/Users.js";
import client from "../index.js";
import cryptoRandomString from "crypto-random-string";
const sendCode = async (req, res) => {
  // try {
  //   const phone = req.params.phone,
  //     user = await Users.find({ phone }),
  //     code = cryptoRandomString({ length: 5 });
  //   if (user.length != 0) {
  //     await Users.updateOne({ phone }, { $set: { code } });
  //   } else {
  //     const addUser = Users({ phone, code });
  //     await addUser.save();
  //   }
  //   client
  //     .sendMessage(phone, code)
  //     .then((response) => {
  //       return res.json({ message: "Codigo de verificacion enviado" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res
  //         .status(500)
  //         .json({ message: "something went wrong, try again" });
  //     });
  // } catch (error) {
  //   return res.status(500).json({ message: err.message });
  // }
};
const verifyCode = async (req, res) => {
  // try {
  //   const { phone, code } = req.body;
  //   const document = await Users.find({ phone });
  //   if (document.length != 0) {
  //     if (code === document[0].code) {
  //       await Users.updateOne({ phone }, { $set: { isActive: true } });
  //       return res.json({
  //         message: "Tu numero ha sido activado exitosamente!",
  //       });
  //     } else {
  //       return res.json({ message: "Codigo incorrecto" });
  //     }
  //   } else {
  //     return res.json({ message: "Numero no registrado" });
  //   }
  // } catch (error) {
  //   return res.status(500).json({ message: error.message });
  // }
};

export const data = { sendCode, verifyCode };
