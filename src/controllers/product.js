const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product");

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: "Falha ao processar sua requisição" });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.post = async (req, res, next) => {
    //Contract usage example
    //Good when you have to validate to external services or other type o DB
    let contract = new ValidationContract();
    contract.hasMinLen(
        req.body.title,
        3,
        "O título deve conter pelo menos 3 caracteres"
    );
    contract.hasMinLen(
        req.body.slug,
        3,
        "O slug deve conter pelo menos 3 caracteres"
    );
    contract.hasMinLen(
        req.body.description,
        3,
        "A descrição deve conter pelo menos 3 caracteres"
    );

    //if data is invalid
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    //end of contract validation

    try {
        await repository.create(req.body);
        res.status(201).send({ message: "Produto cadastrado" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao cadastrar produto",
            data: e,
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: "Produto atualizado" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao atualizar produto",
            data: e,
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: "Produto removido" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao remover produto",
            data: e,
        });
    }
};
