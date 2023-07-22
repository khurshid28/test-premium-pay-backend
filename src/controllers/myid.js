
const {
    InternalServerError,
} = require("../utils/errors.js");
let axios = require("axios")
class Myid {

    async getMe(req, res, next) {
        try {
            let { code } = req.body;
            let url1 = process.env.FACE_URL + "oauth2/access-token"
            let url2 = process.env.FACE_URL + "users/me"
            const response1 = await axios.post(url1, {
                "grant_type": "authorization_code",
                "code": code,
                "client_id": process.env.FACE_CLIENT_ID,
                "client_secret": process.env.FACE_CLIENT_SECRET,
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            const response2 = await axios.get(url2, {
                headers: {
                    "Authorization": "Bearer " + response1.data["access_token"]
                }
            });
            res.status(200).json(response2.data);
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }

}

module.exports = new Myid();
