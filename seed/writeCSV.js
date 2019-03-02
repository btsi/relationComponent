const ObjectsToCsv = require("objects-to-csv");
const faker = require("faker");

(async () => {
  const start = process.hrtime();
  const data = [];
  for (let i = 1; i < 500001; i++) {
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
  await csv.toDisk("./seed/seed.csv");
  const end = process.hrtime(start);
  console.info("Execution time: %ds %dms", end[0], end[1] / 1000000);
})();

// const cats = {};

// const start = process.hrtime();

// (async () => {
//   const data = [];
//   for (let i = 1; i < 500001; i++) {
//     const obj = {
//       id: i,
//       title: faker.fake(
//         "{{commerce.color}} {{commerce.productAdjective}} {{commerce.productMaterial}}"
//       ),
//       image: faker.image.image(),
//       description: faker.lorem.sentence(),
//       price: faker.finance.amount(),
//       category: faker.fake(
//         "{{commerce.productAdjective}} {{commerce.department}}"
//       )
//     };
//     data.push(obj);
//     cats[obj.category] = true;
//   }
//   let csv = new ObjectsToCsv(data);
//   await csv.toDisk("./seed/adventures.csv");
// })();

// (async () => {
//   let i = 1;
//   const data = [];
//   for (cat in cats) {
//     const obj = {
//       id: i,
//       type: cat,
//       image: faker.image.avatar()
//     };
//     data.push(obj);
//     i++;
//   }
//   let csv = new ObjectsToCsv(data);
//   await csv.toDisk("./seed/categories.csv");
// })();

// const end = process.hrtime(start);
// console.info("Execution time: %ds %dms", end[0], end[1] / 1000000);
