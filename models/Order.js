const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    address: { type: Object, required: true },
    city: { type: String, required: true },
    postalcode: { type: Number, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    shippings: [ShippingSchema],

    items: [
      {
        image: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
      },
    ],

    amount: { type: Number, required: true },
    img: { type: String, required: true },
    status: { type: String, default: "pending" },
    price: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentResult: { type: String },
    itemPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidDate: { type: Date },
    deliveredDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);




// const mongoose = require("mongoose");

// const ShippingSchema = new mongoose.Schema(
//       {
//           fullname: {type:String, require:true, unique:true},
//           address: {type:Object, require:true},
//           city: {type:String, require:true},
//           postalcode: {type:Number, require:true},
//           state: {type:String, require:true},
//           contry: {type:String, require: true},
//       },
//       {timestamps: true}
//   );
  

// const OrderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     products: [
//       {
//         productId: {
//           type: String,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],

//  shippings:[ShippingSchema],

//     amount: { type: Number, required: true },
//     img: { type: String, required: true },
//     address: { type: Object, required: true },
//     status: { type: String, default: "pending" },
//     price: { type: Number, required: true },

    

//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", OrderSchema);
