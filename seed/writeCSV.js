const ObjectsToCsv = require("objects-to-csv");
const faker = require("faker");

(async () => {
  const data = [];
  for (let i = 1; i < 101; i++) {
    const obj = {
      type: faker.commerce.department(),
      image: faker.image.imageUrl()
    };
    data.push(obj);
  }
  let csv = new ObjectsToCsv(data);
  await csv.toDisk("./test.csv");
  await console.log("finish");
})();
