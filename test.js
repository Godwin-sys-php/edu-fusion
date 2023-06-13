const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'VotreCléSecrète';

function encrypt(number) {
  const cipher = crypto.createCipheriv(algorithm, secretKey);
  let encrypted = cipher.update(number.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(algorithm, secretKey);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return parseInt(decrypted);
}

// Exemple d'utilisation
const chiffre = 184;
const identifiantUnique = encrypt(chiffre);
console.log(identifiantUnique); // Exemple de sortie : "b8822ff79206dc4e"

const valeurRetrouvee = decrypt(identifiantUnique);
console.log(valeurRetrouvee); // Exemple de sortie : 184
