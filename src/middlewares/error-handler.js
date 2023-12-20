const {
  AuthorizationError,
  InvalidTokenError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");
let axios = require("axios");

module.exports = async (error, req, res, next) => {
  console.log(error);

  if (
    !(
      error instanceof AuthorizationError ||
      error instanceof InvalidTokenError ||
      error instanceof ValidationError ||
      error instanceof ForbiddenError ||
      error instanceof NotFoundError
    )
  ) {
    let text =
      "<b>ERROR ON SERVER</b> : %0A<b>" +
      req.method +
      " " +
      req.url +
      "</b>%0A" +
      `${JSON.stringify(error.stack)}`.substring(0, 300) +
      " ...";
    let url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendmessage?chat_id=-${process.env.ERROR_GROUP_ID}&text=${text}&parse_mode=HTML`;
    let response = await axios.post(url);
  }
  if (error.status < 500) {
    return res.status(error.status).json(error);
  } else {
    return next(error);
  }
};
