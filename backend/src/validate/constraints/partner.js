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
      pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      message: "input is not a valid surname",
    }
  },
  participation: {
    presence: true,
    format: {
      pattern: /^(((1[0-9][0-9])(\.0+)?|([0-9][0-9](\.[0-9]+)?)|([1-9](\.[0-9]+)?))%?|(0+(\.[0-9]*[1-9]+))%?|(0\.[0-9]+[1-9]+))$/, 
      message: "input is not a valid percentage number"
    }
  },
};

module.exports = constraints