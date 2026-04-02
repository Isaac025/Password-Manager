const PASSWORD = require("../model/password");
const { encrypt, decrypt } = require("../utils/crypto");

// CREATE
const addPassword = async (req, res) => {
  try {
    const { site, username, password } = req.body;

    const encrypted = encrypt(password);

    const newPassword = await PASSWORD.create({
      user: req.user,
      site,
      username,
      password: JSON.stringify(encrypted),
    });

    res.status(201).json(newPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getPasswords = async (req, res) => {
  try {
    const passwords = await PASSWORD.find({ user: req.user });

    const decryptedPasswords = passwords.map((item) => {
      const decrypted = decrypt(JSON.parse(item.password));

      return {
        ...item._doc,
        password: decrypted,
        username: item.username || "", // Handle missing username
      };
    });

    res.json(decryptedPasswords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deletePassword = async (req, res) => {
  try {
    await PASSWORD.findByIdAndDelete({ _id: req.params.id, user: req.user });
    res.json({ message: "Password deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editPassword = async (req, res) => {
  try {
    const { site, username, password } = req.body;

    // Encrypt new password if provided
    let updatedData = { site, username };
    if (password) {
      const encrypted = encrypt(password);
      updatedData.password = JSON.stringify(encrypted);
    }

    const updatedPassword = await PASSWORD.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }, // return updated document
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    // Decrypt before sending back
    const decrypted = decrypt(JSON.parse(updatedPassword.password));
    res.status(200).json({
      message: "password updated successfully",
      ...updatedPassword._doc,
      password: decrypted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPassword, getPasswords, deletePassword, editPassword };
