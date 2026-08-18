const DOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const purify = DOMPurify(window);

function sanitizeHTML(html) {
  return purify.sanitize(html);
}

module.exports = sanitizeHTML