const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_KEY; // must be 32 chars

// Encrypt
const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // generate per encryption

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    content: encrypted,
  };
};

// Decrypt
const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(hash.iv, "hex"),
  );

  let decrypted = decipher.update(hash.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

module.exports = { encrypt, decrypt };
