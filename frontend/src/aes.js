var aes256 = require("aes256");
var key = "vKaukhdX2go0QJ4DZCVcgaMiwbY4caeH";

export const encrypt_Message = (text) => {
  var encrypted = aes256.encrypt(key, text);
  return encrypted;
};
export const decrypt_Message = (cipher, username) => {
  if (cipher.startsWith("Hi")) {
    return cipher;
  }
  if (cipher.startsWith(username)) {
    return cipher;
  }
  var decrypted = aes256.decrypt(key, cipher);
  return decrypted;
};