const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product");

exports.get = (req, res, next) => {
    repository
        .get()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(400).send({
                message: "Falha ao retornar produtos",
                data: e,
            });
        });
};

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
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

    repository
        .create(req.body)
        .then((x) => {
            res.status(201).send({ message: "Produto cadastrado" });
        })
        .catch((e) => {
            res.status(400).send({
                message: "Falha ao cadastrar produto",
                data: e,
            });
        });
};

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then((x) => {
            res.status(200).send({ message: "Produto atualizado" });
        })
        .catch((e) => {
            res.status(400).send({
                message: "Falha ao atualizar produto",
                data: e,
            });
        });
};

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.id)
        .then((x) => {
            res.status(200).send({ message: "Produto removido" });
        })
        .catch((e) => {
            res.status(400).send({
                message: "Falha ao remover produto",
                data: e,
            });
        });
};
