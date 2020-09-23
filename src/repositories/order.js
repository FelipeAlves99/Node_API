const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async () => {
    let res = await Order.find({}, "number status customer items")
        .populate("customer", "name")
        .populate("items.product", "title");
    return res;
};

exports.create = async (data) => {
    let order = new Order(data);
    await order.save();
};

exports.update = async (id, data) => {
    await Order.findByIdAndUpdate(id, {
        $set: {
            status: data.status,
            items: data.items,
        },
    });
};

exports.delete = async (id) => {
    await Order.findOneAndRemove(id);
};
