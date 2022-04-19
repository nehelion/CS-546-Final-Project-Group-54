const axios = require("axios");

let exportedMethod = {
  async searchShowByTerm(showSearchTerm) {
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${showSearchTerm}`);
    return data;
  },
};

module.exports = exportedMethod;
