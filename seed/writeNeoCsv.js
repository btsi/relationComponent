const ObjectsToCsv = require("objects-to-csv");
const faker = require("faker");
const fs = require("fs");

async function write(c) {
  let mod = c * 100000;
  const data = [];
  for (let i = mod + 1; i < mod + 100001; i++) {
    const obj = {
      id: i,
      title: faker.fake(
        "{{commerce.color}} {{commerce.productAdjective}} {{commerce.productMaterial}}"
      ),
      image: faker.image.image(),
      description: faker.lorem.sentence(),
      price: faker.finance.amount(),
      category: faker.fake(
        "{{commerce.productAdjective}} {{commerce.department}}"
      ),
      cat_img: faker.image.avatar()
    };
    data.push(obj);
  }
  let csv = new ObjectsToCsv(data);
  await csv.toDisk("./seed/seed.csv", { append: true });
}

(async function() {
  let c = 0;
  while (c < 100) {
    const start = process.hrtime();
    await write(c);
    const end = process.hrtime(start);
    console.info(
      `Execution time loop ${c + 1}: %ds %dms`,
      end[0],
      end[1] / 1000000
    );
    c++;
  }
})();
