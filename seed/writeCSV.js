const ObjectsToCsv = require("objects-to-csv");
const faker = require("faker");
const fs = require("fs");

const bigString = () =>
  `${faker.fake(
    "{{commerce.color}} {{commerce.productAdjective}} {{commerce.productMaterial}}"
  )},${faker.image.image()},${faker.lorem.sentence()},${faker.finance.amount()},${faker.fake(
    "{{commerce.productAdjective}} {{commerce.department}}"
  )},${faker.image.avatar()}\n`;

const writeCSV = (() => {
  const start = process.hrtime();
  const stream = fs.createWriteStream("./seed/seed.csv", { flags: "a" });
  for (let i = 0; i < 1000000; i++) {
    stream.write(bigString());
  }
  const end = process.hrtime(start);
  console.info(
    "Execution time: %dm %ds %dms",
    Math.floor(end[0] / 60),
    end[0] % 60,
    end[1] / 1000000
  );
})();

// async function write(c) {
//   const start = process.hrtime();
//   let mod = c * 500000;
//   const data = [];
//   for (let i = mod + 1; i < mod + 500001; i++) {
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
//       ),
//       cat_img: faker.image.avatar()
//     };
//     data.push(obj);
//   }
//   let csv = new ObjectsToCsv(data);
//   await csv.toDisk("./seed/seed.csv");
//   const end = process.hrtime(start);
//   console.info("Execution time: %ds %dms", end[0], end[1] / 1000000);
// }

// (function() {
//   let c = 0;
//   while (c < 20) {
//     write(c);
//     console.log("completed loop#", c + 1);
//     c++;
//   }
// })();

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
