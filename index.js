const axios = require("axios");
const [word] = process.argv.slice(2);

const app_key = "9b12a5e9f99fb5fd01d2c874222465ec";
const app_id = "5d4dc796";
const baseUrl = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false?fields=definitions`;

const options = {
  headers: {
    app_id: app_id,
    app_key: app_key
  }
};

printMyResults = (data, type) => {
  console.log(`${word} (${type})`);
  data.forEach((el, index) => {
    console.log(`${index + 1}. ${el.shortDefinitions[0]}`);
  });
};

getWordDefinitions = async () => {
  try {
    const res = await axios.get(baseUrl, options);
    const data = res.data.results[0].lexicalEntries[0].entries[0].senses;
    const type = res.data.results[0].lexicalEntries[0].lexicalCategory.text;
    printMyResults(data, type);
  } catch (error) {
    console.log(error);
  }
};

getWordDefinitions();
