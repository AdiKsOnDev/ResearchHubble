function returnKey(x){
  let y = "";
  y = x === "OpenAI" ? caesarDecipher("zr-NTUjeINzb6HKx7wuokGrA3IsirMQ0prX12lIjg2HGgtXYlip",7) : x === "HF" ? caesarDecipher("om_paAubNNyAcdsbBvXTVAjGdqzoCUfJIDSWJ",7):"" ;
  return y;
}

function caesarDecipher(encryptedString, shift) {
  // Check if the shift is within the valid range (0 to 25)
  if (shift < 0 || shift > 25) {
    return "Shift value must be between 0 and 25.";
  }

  // Create an empty string to store the result
  let result = "";

  for (let i = 0; i < encryptedString.length; i++) {
    let char = encryptedString[i];

    if (char.match(/[a-z]/i)) {
      // Determine if the character is uppercase or lowercase
      const isUpperCase = char === char.toUpperCase();

      // Convert the character to uppercase for consistency
      char = char.toUpperCase();

      // Shift the character code in the opposite direction
      const shiftedCharCode = ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65;

      // Convert the shifted character code back to the original case
      if (!isUpperCase) {
        char = String.fromCharCode(shiftedCharCode).toLowerCase();
      } else {
        char = String.fromCharCode(shiftedCharCode);
      }
    }

    // Append the character to the result string
    result += char;
  }

  return result;
}



export default returnKey;