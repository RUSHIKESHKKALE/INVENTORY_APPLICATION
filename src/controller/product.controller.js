
//importing productmodels in cotroller
import productModel from "../models/products.models.js";

export default class productController {
  //getting all product
  getProduct(req, res) {
    let products = productModel.getData();
    console.log(products);

    res.render("products", { products,userEmail:req.session.userEmail});
    //path.resolve gives us current directory path
    // console.log(path.resolve());
    // return res.sendFile(path.join(path.resolve(),"src","veiws","products.html"));
  }

  getAddForm(req, res,next) {
     res.render("new-product", { errorMessage: null,userEmail:req.session.userEmail });
  }

  //adding new product data into table
  addNewProduct(req, res) {
    const {name,desc,prize}=req.body;
    const img="images/"+req.file.filename;
    console.log(req.body);
    productModel.addData(name,desc,prize,img);
    let products = productModel.getData();

    return res.render("products", { products,userEmail:req.session.userEmail });
  }

  //getting view for updates data
  //for updating our existing view
  getUpdateView(req,res,next){
   
   // 1. if product exists then return view
   const id = req.params.id;
   const productFound = productModel.getById(id);
   if (productFound) {
     res.render('update-product', {
       product: productFound,
       errorMessage: null
       ,userEmail:req.session.userEmail
     });
   }
   // 2. else return errors.
   else {
     res.status(401).send('Product not found');
   }
  }

  //for getting updated data
    postUpdateProduct(req,res){
      
      const { id, name, desc, prize } = req.body;
      const productFound = productModel.getById(id);
    
      if (!productFound) {
        return res.status(401).send('Product not found');
      }
    
      // Update non-image properties
      productFound.name = name;
      productFound.desc = desc;
      productFound.prize = prize;
    
      // Update image URL if a new file is uploaded
      if (req.file) {
        productFound.img = "images/" + req.file.filename;
      }
    
      // Save the updated product
      productModel.update(productFound);
    
      let products = productModel.getData();
    return res.render("products", { products,userEmail:req.session.userEmail });
  }

  //for deleting the data
  deleteProduct(req,res){
    const id =req.params.id;
    const productFound = productModel.getById(id);
    if (!productFound) {
     return res.status(401).send('Product not found');
    }
    
    productModel.delete(id);
    let products = productModel.getData();
     res.render("products", { products });
  }
}
