const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");

exports.get = (req, res, next) => {
    Product.find(
        /*filter*/ { active: true },
        /*returned fields*/ "title price slug"
    )
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
    Product.findOne(
        /*filter*/ { slug: req.params.slug, active: true },
        /*returned fields*/ "title description price slug tags"
    )
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

exports.getByTag = (req, res, next) => {
    Product.find(
        { tags: req.params.tag, active: true },
        "title description price slug tags"
    )
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

    let product = new Product(req.body);
    product
        .save()
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
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug,
        },
    })
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
    Product.findOneAndRemove(req.body.id)
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
