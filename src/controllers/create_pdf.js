
const {
    InternalServerError,
    AuthorizationError,
} = require("../utils/errors.js");

const PDFDocument = require('pdfkit');
const fs = require('fs');


class CreatePDF {

    async create(req, res, next) {
        try {
            let { text } = req.body;
            
            const doc = new PDFDocument({ size: 'A5' });
            doc.text(text)
            
            doc.pipe(fs.createWriteStream(__dirname+ '/MyPDFDoc.pdf'));
            doc.end();
            res.status(200).json("pdf is created");
        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }

}

module.exports = new CreatePDF();


