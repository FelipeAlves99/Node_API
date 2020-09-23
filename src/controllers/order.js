const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/order");
const guid = require("guid");

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao recuperar pedido",
            data: e,
        });
    }
};

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items,
        });
        res.status(201).send({ message: "Pedido cadastrado" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao cadastrar pedido",
            data: e,
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: "Pedido atualizado" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao atualizar pedido",
            data: e,
        });
    }
};
