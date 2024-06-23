export const calcSubPrice = (product) => +product.count * +product.item.price;

export const calcTotalPrice = (product) => {
  return product.reduce((acc, el) => {
    return +acc + +el.subPrice;
  }, 0);
};

let arr = [
  [
    {
      name: "Admin1.1",
      Password: "#west_1.1",
    },
    {
      name: "Admin1.2",
      Password: "#west_1.2",
    },
    {
      name: "Admin1.3",
      Password: "#west_1.3",
    },
  ],
  [
    {
      name: "Admin2.1",
      Password: "#west_2.1",
    },
    {
      name: "Admin2.2",
      Password: "#west_2.2",
    },
  ],
];

let res1 = arr.map((el) => el);
// console.log(res1, "1-[...]");

let arr2 = [
  {
    name: "name",
    img: "first img",
    txt: "first txt",
    id: "first #id",
  },
  {
    name: "second",
    img: "img",
    txt: "txt",
    id: "#id",
  },
  {
    name: "obj",
    img: "img 3",
    txt: "example",
    id: "312453487",
  },
  {
    name: "name",
    img: "url img",
    txt: "test",
    id: "EAfdfGdGDVggGDRWS",
  },
];

let res = arr2.map((el) => el.name)
let result = res.filter((e) => e === "name").length;
console.log(res, "1");
console.log(result,);
