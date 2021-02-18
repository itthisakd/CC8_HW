// import * as sales from '../js_advanced/data'
const sales = require("./data");

// 1. จำนวน transaction ทั้งหมด

const totalNumOfTransactions = sales.length;
console.log(`1. ${totalNumOfTransactions} transactions\n`);






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
          amountPaid: acc[name].amountPaid + finalPrice
        },
      }
    : {
        ...acc,
      [name]: {
          phonesPurchased: 1,
          amountPaid: finalPrice
        },
      };
}, []);
console.log("2. Sales by Customer: ")
console.log(customers);





// 3. ยอดขายทั้งหมด (หลังหัก discount)

const totalSales = sales.reduce((acc, cur) => acc + cur.product.unitPrice * (cur.discount ? 1 - cur.discount : 1), 0).toFixed(2)

console.log(`3. Total sales:`);
console.log(totalSales);






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
          totalAmt: (acc[brand].totalAmt += finalPrice)
        },
      }
    : {
        ...acc,
        [brand]: {
          numSold: 1,
          totalAmt: finalPrice
        },
      };
}, {})

console.log("4. Sales by Brand: ");
console.log(brands);







// 5. สินค้าที่ถูกขายมีกี่รุ่นในแต่ละยี่ห้อ แต่ละรุ่นขายไปกี่เครื่อง และ ยอดรวมเท่าไหร่

let arrOfBrands = [...Object.keys(brands)];
let holder = {};
arrOfBrands.forEach((item) => (holder[item] = {}));

const salesByModel = sales.reduce(
  (acc, cur) => {
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
    return acc
  },
  holder
);

console.log("5. Sales by Model: ");
console.log(salesByModel)






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
}, {})

console.log("6. Sales by Payment Method: ")
console.log(paymentMethod)





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
}, {})

console.log(`7. Sales by Date: `)
console.log(salesByDate)





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
}, {})

salesByModelSortedArr = Object.values(salesByModelSortedObj).sort(
  (a, b) => b[1] - a[1]
);

console.log(`8. Sales by Model (sorted): `);
console.log(salesByModelSortedArr)

// 9. เรียงลูกค้าที่ซื้อมากที่สุดจากมากไปน้อย
let arrOfCustomers = [...Object.keys(customers)];
let salesByCustomer = new Map()
arrOfCustomers.forEach(cust => salesByCustomer.set(cust, customers[cust].amountPaid.toFixed(2)))
let salesByCustomerSorted = [...salesByCustomer].sort((a, b) => b[1] - a[1])

console.log(`9. Sales by Customer (sorted): `)
console.log(salesByCustomerSorted)



//other stuff...

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