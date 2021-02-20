// import * as sales from '../js_advanced/data'
const sales = require("./data");


// 1. จำนวน transaction ทั้งหมด

const totalNumOfTransactions = sales.length;
console.log(`1. ${totalNumOfTransactions} transactions\n`);

//OUTPUT
//54 transactions

// 2. จำนวนลูกค้าที่แตกต่างกัน มีใครบ้าง แต่ละคนซื้อไปยอดรวมกันกี่เครื่อง

const customers = sales.reduce((acc, cur) => {
  const name = cur.customer;
  const finalPrice =
    "discount" in cur
      ? cur.product.unitPrice * (1 - cur.discount)
      : cur.product.unitPrice;

  return name in acc
    ? {
        ...acc,
        [name]: {
          ...acc[name],
          phonesPurchased: acc[name].phonesPurchased + 1,
          amountPaid: acc[name].amountPaid + finalPrice,
        },
      }
    : {
        ...acc,
        [name]: {
          phonesPurchased: 1,
          amountPaid: finalPrice,
        },
      };
}, []);
console.log("2. Sales by Customer: ");
console.log(customers);

//OUTPUT 
// Sales by Customer: 
// {
//   Sun: { phonesPurchased: 3, amountPaid: 68094 },
//   Tle: { phonesPurchased: 3, amountPaid: 95030 },
//   Beer: { phonesPurchased: 2, amountPaid: 51800 },
//   Jit: { phonesPurchased: 2, amountPaid: 34310 },
//   Palm: { phonesPurchased: 2, amountPaid: 66510 },
//   Top: { phonesPurchased: 2, amountPaid: 52299 },
//   Snap: { phonesPurchased: 2, amountPaid: 51010 },
//   Ham: { phonesPurchased: 3, amountPaid: 59574.25 },
//   Micky: { phonesPurchased: 3, amountPaid: 109700 },
//   Boss: { phonesPurchased: 2, amountPaid: 55220 },
//   Sila: { phonesPurchased: 1, amountPaid: 19990 },
//   Cin: { phonesPurchased: 4, amountPaid: 67879 },
//   Sine: { phonesPurchased: 2, amountPaid: 38579.15 },
//   Note: { phonesPurchased: 1, amountPaid: 32900 },
//   Bank: { phonesPurchased: 2, amountPaid: 29998 },
//   Leo: { phonesPurchased: 2, amountPaid: 23219.05 },
//   Game: { phonesPurchased: 3, amountPaid: 66940 },
//   U: { phonesPurchased: 2, amountPaid: 25589.3 },
//   Boy: { phonesPurchased: 1, amountPaid: 48900 },
//   Boom: { phonesPurchased: 2, amountPaid: 30998 },
//   Am: { phonesPurchased: 2, amountPaid: 24989.35 },
//   Um: { phonesPurchased: 2, amountPaid: 56210 },
//   Win: { phonesPurchased: 1, amountPaid: 20925 },
//   Dom: { phonesPurchased: 2, amountPaid: 64265 },
//   Sern: { phonesPurchased: 2, amountPaid: 42899 },
//   Tom: { phonesPurchased: 1, amountPaid: 32900 }
// }

// 3. ยอดขายทั้งหมด (หลังหัก discount)

const totalSales = sales
  .reduce(
    (acc, cur) =>
      acc + cur.product.unitPrice * (cur.discount ? 1 - cur.discount : 1),
    0
  )
  .toFixed(2);

console.log(`3. Total sales:`);
console.log(totalSales);

//OUTPUT
// Total sales:
// 1270728.10

// 4. สินค้าที่ถูกขายมี่กี่ยี่ห้อ แต่ละยี่ห้อขายไปกี่เครื่อง และ ยอดรวมเท่าไหร่
const brands = sales.reduce((acc, cur) => {
  const finalPrice =
    "discount" in cur
      ? cur.product.unitPrice * (1 - cur.discount)
      : cur.product.unitPrice;
  const brand = cur.product.name;
  return brand in acc
    ? {
        ...acc,
        [brand]: {
          numSold: (acc[brand].numSold += 1),
          totalAmt: (acc[brand].totalAmt += finalPrice),
        },
      }
    : {
        ...acc,
        [brand]: {
          numSold: 1,
          totalAmt: finalPrice,
        },
      };
}, {});

console.log("4. Sales by Brand: ");
console.log(brands);

//OUTPUT
//Sales by Brand: 
// {
//   iPhone: { numSold: 25, totalAmt: 808265 },
//   Samsung: { numSold: 15, totalAmt: 269832.55 },
//   Oppo: { numSold: 5, totalAmt: 84259 },
//   Xiaomi: { numSold: 2, totalAmt: 6628.049999999999 },
//   Vivo: { numSold: 7, totalAmt: 101743.5 }
// }

// 5. สินค้าที่ถูกขายมีกี่รุ่นในแต่ละยี่ห้อ แต่ละรุ่นขายไปกี่เครื่อง และ ยอดรวมเท่าไหร่

let arrOfBrands = [...Object.keys(brands)];
let holder = {};
arrOfBrands.forEach((item) => (holder[item] = {}));

const salesByModel = sales.reduce((acc, cur) => {
  const finalPrice =
    "discount" in cur
      ? cur.product.unitPrice - (1 - cur.discount)
      : cur.product.unitPrice;
  const brand = cur.product.name;
  const model = cur.product.model;

  acc[brand] =
    model in acc[brand]
      ? {
          ...acc[brand],
          [model]: [
            (acc[brand][model][0] += 1),
            (acc[brand][model][1] += finalPrice),
          ],
        }
      : {
          ...acc[brand],
          [model]: [1, Number(finalPrice)],
        };
  return acc;
}, holder);

console.log("5. Sales by Model: ");
console.log(salesByModel);

// OUTPUT
// Sales by Model: 
// {
//   iPhone: {
//     '12': [ 9, 296098.35 ],
//     '12 Pro': [ 9, 404097.1 ],
//     '11 Pro': [ 2, 73798.4 ],
//     SE2000: [ 1, 14900 ],
//     '12 Mini': [ 4, 103598.29999999999 ]
//   },
//   Samsung: { S21: [ 8, 223196.75 ], A31: [ 3, 23995.55 ], A42: [ 4, 47960 ] },
//   Oppo: { A15: [ 1, 4299 ], Reno5: [ 4, 79960 ] },
//   Xiaomi: { 'Redmi 9C': [ 2, 6797.05 ] },
//   Vivo: {
//     'V20 Pro': [ 4, 59995.15 ],
//     'X50 Pro': [ 2, 39997.35 ],
//     V20: [ 1, 10999 ]
//   }
// }

// 6. หายอดรวมของการจ่ายแต่ละประเภท (Cash, Credit, ...)
const paymentMethod = sales.reduce((acc, cur) => {
  const finalPrice =
    "discount" in cur
      ? cur.product.unitPrice * (1 - cur.discount)
      : cur.product.unitPrice;
  const pay = cur.type;
  return pay in acc
    ? {
        ...acc,
        [pay]: finalPrice.toFixed(2),
      }
    : {
        ...acc,
        [pay]: (acc[pay] += finalPrice).toFixed(2),
      };
}, {});

console.log("6. Sales by Payment Method: ");
console.log(paymentMethod);

//OUTPUT
// Sales by Payment Method: 
// {
//   Cash: '23310.00',
//   Credit: '3229.05',
//   Airpay: '12999.35',
//   'True Wallet': '12749.15'
// }

// 7. หายอดรวมในแต่ละวัน

const salesByDate = sales.reduce((acc, cur) => {
  const finalPrice =
    "discount" in cur
      ? cur.product.unitPrice * (1 - cur.discount)
      : cur.product.unitPrice;
  const date = cur.saleDate;
  return date in acc
    ? {
        ...acc,
        [date]: finalPrice.toFixed(2),
      }
    : {
        ...acc,
        [date]: (acc[date] += finalPrice).toFixed(2),
      };
}, {});

console.log(`7. Sales by Date: `);
console.log(salesByDate);

//OUTPUT
// Sales by Date: 
// {
//   '01-01-2021': '48900.00',
//   '02-01-2021': '3399.00',
//   '03-01-2021': '27900.00',
//   '04-01-2021': '5599.30',
//   '05-01-2021': '11990.00',
//   '06-01-2021': '19990.00',
//   '07-01-2021': '23310.00',
//   '08-01-2021': '27900.00',
//   '09-01-2021': '12999.35',
//   '10-01-2021': '32900.00',
//   '11-01-2021': '12749.15'
// }

// 8. เรียงยอดขายของแต่ละรุ่นจากมากไปน้อย
const salesByModelSortedObj = sales.reduce((acc, cur) => {
  const finalPrice =
    "discount" in cur
      ? cur.product.unitPrice - (1 - cur.discount)
      : cur.product.unitPrice;
  const brand = cur.product.name;
  const model = cur.product.model;

  return model in acc
    ? {
        ...acc,
        [brand + " " + model]: [
          brand + model,
          ([brand + " " + model][1] += finalPrice.toFixed(2)),
        ],
      }
    : {
        ...acc,
        [brand + " " + model]: [brand + " " + model, finalPrice.toFixed(2)],
      };
}, {});

salesByModelSortedArr = Object.values(salesByModelSortedObj).sort(
  (a, b) => b[1] - a[1]
);

console.log(`8. Sales by Model (sorted): `);
console.log(salesByModelSortedArr);

// OUTPUT
// Sales by Model (sorted): 
// [
//   [ 'iPhone 12 Pro', '48899.30' ],
//   [ 'iPhone 11 Pro', '36899.15' ],
//   [ 'iPhone 12', '32900.00' ],
//   [ 'Samsung S21', '27899.20' ],
//   [ 'iPhone 12 Mini', '25899.10' ],
//   [ 'Vivo X50 Pro', '19998.35' ],
//   [ 'Oppo Reno5', '19990.00' ],
//   [ 'Vivo V20 Pro', '14998.15' ],
//   [ 'iPhone SE2000', '14900.00' ],
//   [ 'Samsung A42', '11990.00' ],
//   [ 'Vivo V20', '10999.00' ],
//   [ 'Samsung A31', '7998.30' ],
//   [ 'Oppo A15', '4299.00' ],
//   [ 'Xiaomi Redmi 9C', '3398.05' ]
// ]

// 9. เรียงลูกค้าที่ซื้อมากที่สุดจากมากไปน้อย
let arrOfCustomers = [...Object.keys(customers)];
let salesByCustomer = new Map();
arrOfCustomers.forEach((cust) =>
  salesByCustomer.set(cust, customers[cust].amountPaid.toFixed(2))
);
let salesByCustomerSorted = [...salesByCustomer].sort((a, b) => b[1] - a[1]);

console.log(`9. Sales by Customer (sorted): `);
console.log(salesByCustomerSorted);

// Sales by Customer (sorted): 
// [
//   [ 'Micky', '109700.00' ], [ 'Tle', '95030.00' ],
//   [ 'Sun', '68094.00' ],    [ 'Cin', '67879.00' ],
//   [ 'Game', '66940.00' ],   [ 'Palm', '66510.00' ],
//   [ 'Dom', '64265.00' ],    [ 'Ham', '59574.25' ],
//   [ 'Um', '56210.00' ],     [ 'Boss', '55220.00' ],
//   [ 'Top', '52299.00' ],    [ 'Beer', '51800.00' ],
//   [ 'Snap', '51010.00' ],   [ 'Boy', '48900.00' ],
//   [ 'Sern', '42899.00' ],   [ 'Sine', '38579.15' ],
//   [ 'Jit', '34310.00' ],    [ 'Note', '32900.00' ],
//   [ 'Tom', '32900.00' ],    [ 'Boom', '30998.00' ],
//   [ 'Bank', '29998.00' ],   [ 'U', '25589.30' ],
//   [ 'Am', '24989.35' ],     [ 'Leo', '23219.05' ],
//   [ 'Win', '20925.00' ],    [ 'Sila', '19990.00' ]
// ]





//other stuff...please ignore...

// let date1 = new Date(2020, 6, 15, 13, 45, 5);
// let date2 = new Date(2020, 6, 15, 8, 23, 23);

// const isSameDay = (d1, d2) => {
//   return (
//     d1.getDate() === d2.getDate() &&
//     d1.getMonth() === d2.getMonth() &&
//     d1.getFullYear() === d2.getFullYear()
//   );
// }

// console.log(isSameDay(date1, date2))
