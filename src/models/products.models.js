
export default class productModel {
  constructor(_id, _name, _description, _prize, _imgurl) {
    this.id = _id;
    this.name = _name;
    this.desc = _description;
    this.prize = _prize;
    this.img = _imgurl;
  }

  static getData() {
    return products;
  }

  static update(productObj) {
   const index= products.findIndex((p) => p.id == productObj.id);
   products[index]=productObj;

}

  //delete product
  static delete(id){
    const index=products.findIndex((p)=>p.id==id);
    products.splice(index,1);
  }
  //adding new data which filled by user in form
  static addData(name,desc,prize,img) {
    let newProduct = new productModel(
      products.length + 1,
      name,
      desc,
      prize,
      img
    );
    products.push(newProduct);
  }

  static getById(id) {
    return products.find((p) => p.id == id);
  }
}

var products = [
  new productModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new productModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new productModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
];
