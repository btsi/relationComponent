const ObjectsToCsv = require("objects-to-csv");
const faker = require("faker");

(async () => {
  const data = [];
  for (let i = 1; i < 10001; i++) {
    const obj = {
      id: i,
      title: faker.fake(
        "{{commerce.color}} {{commerce.productAdjective}} {{commerce.productMaterial}}"
      ),
      image: faker.image.image(),
      description: faker.lorem.paragraph(),
      price: faker.finance.amount(),
      category: faker.fake(
        "{{commerce.productAdjective}} {{commerce.department}}"
      ),
      cat_img: faker.image.avatar()
    };
    data.push(obj);
  }
  let csv = new ObjectsToCsv(data);
  await csv.toDisk("./seed/seed.csv");
  await console.log("finish");
})();
