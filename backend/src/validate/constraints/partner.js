var constraints = {
  name: {
    presence: true,
    format: {
      pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      message: "input is not a valid name",
    }
  },
  surname: {
    presence: true,
    format: {
      pattern: /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      message: "input is not a valid surname",
    }
  },
  participation: {
    presence: true,
    format: {
      pattern: /^(((1[0-9][0-9])(\.0+)?|([0-9][0-9](\.[0-9]+)?)|([1-9](\.[0-9]+)?))%?|(0+(\.[0-9]*[1-9]+))%?|(0\.[0-9]+[1-9]+))$/, // aceita 0 < numero < 100 com ou sem % ou em forma fracionaria.
      message: "input is not a valid percentage number"
    }
  },
};

module.exports = constraints