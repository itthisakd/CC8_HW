// ให้เขียนฟังก์ชัน changeStringtoThaiDate() โดยฟังก์ชันนี้จะรับค่าวันที่ที่เป็นแบบตัวเลข และ คืนค่ามาเป็นวันที่แบบไทย แต่ถ้าวันที่ผิดพลาดหรือเดือน(กุมภาพันธ์ไม่ต้องเช็ค Leap year)ผิดพลาดให้แสดงค่าว่า “Error” , ห้ามใช้ Date object[Date()]
// --------------------------------
// input: “12-11-1996”
// output: “วันที่ 12 เดือนพฤศจิกายน พ.ศ. 2539”
// ---------------------------------
// input: “31-11-2000”
// output: “Error”
// --------------------------------
// input: “12-13-1996”
// output: “Error”
// --------------------------------

let thaiMonths = {
    'มกราคม': 31,
    'กุมภาพันธ์': 28,
    'มีนาคม': 31,
    'เมษายน': 30,
    'พฤษภาคม': 31,
    'มิถุนายน': 30,
    'กรกฎาคม': 31,
    'สิงหาคม': 31,
    'กันยายน': 30,
    'ตุลาคม': 31,
    'พฤศจิกายน': 30,
    'ธันวาคม': 31
}
let monthsArr = Object.entries(thaiMonths)
console.log(monthsArr)

const changeStringtoThaiDate = (dateStr) => {
    let arr = dateStr.split("-");
    if (arr[1] > 12 || arr[0] > monthsArr[arr[1] - 1][1]) return "Error"
      
    return `วันที่ ${arr[0]} เดือน${monthsArr[arr[1] - 1][0]} พ.ศ. ${Number(arr[2]) + 543}`;
}

console.log(changeStringtoThaiDate('12-11-1996'));
console.log(changeStringtoThaiDate('31-11-2000'));
console.log(changeStringtoThaiDate('12-13-1996'));


//------------------------------------------------------------------------

// ให้เขียนโปรแกรมที่รับค่า a และ b จาก prompt อย่างละครั้ง และให้เช็คว่า 
// a / b เป็นเศษส่วนอย่างต่ำไหม ถ้าเป็นให้แสดง alert(a / b) ออกมา ถ้าไม่เป็นเศษส่วนอย่างต่ำ ให้หาเศษส่วนอย่างต่ำของ a และ b ก่อน หลังจากนั้น alert(a / b) ที่เป็นเศษส่วนอย่างต่ำแล้วออกมา

// เช่น

// INPUT		⇒ a=5, b=7			INPUT		⇒ a =
// OUTPUT	⇒ 5/7					OUTPUT	⇒ 


// INPUT		⇒ a=30, b=3			INPUT		⇒ a=20, b=100
// OUTPUT	⇒ 10/1				OUTPUT	⇒ 1/5

const findAnswer = (a, b) => {
    if (a % b === 0) {
      return `${a / b}/${1}`;
    } else if (b % a === 0) {
      return `${1}/${b/a}`;
    } else if (a % b !== 0) {
      return `${a}/${b}`;
    }
}

console.log(findAnswer(5, 7));
console.log(findAnswer(10, 5));
console.log(findAnswer(20, 100));
console.log(findAnswer(100, 100));
console.log(findAnswer(9, 2));



//----------------------------------------

//alternative: clearer for first qn

// let monthNamesThai = {
//   "": 0,
//   มกราคม: 31,
//   กุมภาพันธ์: 28,
//   มีนาคม: 31,
//   เมษายน: 30,
//   พฤษภาคม: 31,
//   มิถุนายน: 30,
//   กรกฎาคม: 31,
//   สิงหาคม: 31,
//   กันยายน: 30,
//   ตุลาคม: 31,
//   พฤษจิกายน: 30,
//   ธันวาคม: 31,
// };

// let monthArr = Object.entries(monthNamesThai);


// const changeStringtoThaiDate = (d) => {
//   let day = Number(d.split("-")[0]);
//   let month = Number(d.split("-")[1]);
//   let year = Number(d.split("-")[2]) + 543;
//   if (month > 12) {
//     return "Error";
//   } else if (day > monthArr[month][1]) {
//     return "Error";
//   }

//   return `วันที่ ${day} เดือน ${monthArr[month][0]} พ.ศ. ${year}`;
// }

// console.log(changeStringtoThaiDate("12-11-1996"));
// console.log(changeStringtoThaiDate("31-11-2000"));
// console.log(changeStringtoThaiDate("12-13-1996"));