const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

exports.create = async (data) => {
    let customer = new Customer(data);
    await customer.save();
};

exports.update = async (id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password,
        },
    });
};

exports.delete = async (id) => {
    await Customer.findOneAndRemove(id);
};
