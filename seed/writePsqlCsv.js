const ObjectsToCsv = require("objects-to-csv");
const faker = require("faker");

const cats = {};

(async function() {
  let c = 0;
  while (c < 1) {
    const start = process.hrtime();
    await writeAdventures(c);
    const end = process.hrtime(start);
    console.info(
      `Execution time loop ${c + 1}: %dm %ds %dms`,
      Math.floor(end[0] / 60),
      end[0] % 60,
      end[1] / 1000000
    );
    c++;
  }
  writeCatagories();
})();

async function writeAdventures(c) {
  let mod = c * 100000;
  const data = [];
  for (let i = mod + 1; i < mod + 100001; i++) {
    const category = faker.fake(
      "{{commerce.productAdjective}} {{commerce.department}}"
    );
    const obj = {
      id: i,
      title: faker.fake(
        "{{commerce.color}} {{commerce.productAdjective}} {{commerce.productMaterial}}"
      ),
      image: faker.image.image(),
      description: faker.lorem.sentence(),
      price: Math.floor(faker.finance.amount()),
      cat_id: Math.floor(Math.random() * 374) + 1
    };
    data.push(obj);
    cats[category] = true;
  }
  let csv = new ObjectsToCsv(data);
  await csv.toDisk("./seed/adventures.csv", { append: true });
}

async function writeCatagories() {
  let i = 1;
  const data = [];
  for (cat in cats) {
    const obj = {
      id: i,
      type: cat,
      image: faker.image.avatar()
    };
    data.push(obj);
    i++;
  }
  let csv = new ObjectsToCsv(data);
  await csv.toDisk("./seed/categories.csv");
}
