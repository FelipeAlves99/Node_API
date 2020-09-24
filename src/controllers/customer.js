const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer");
const md5 = require("md5");
const emailService = require("../services/email-service");

exports.post = async (req, res, next) => {
    //Contract usage example
    //Good when you have to validate to external services or other type o DB
    let contract = new ValidationContract();
    contract.hasMinLen(
        req.body.name,
        3,
        "O nome deve conter pelo menos 3 caracteres"
    );
    contract.isEmail(req.body.email, "Email inválido");
    contract.hasMinLen(
        req.body.password,
        6,
        "A senha deve conter pelo menos 6 caracteres"
    );

    //if data is invalid
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    //end of contract validation

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
        });

        emailService.send(
            req.body.email,
            "Bem vindo ao Node Store",
            global.EMAIL.TMPL.replace("{0}", req.body.name)
        );
        res.status(201).send({ message: "Cliente cadastrado" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao cadastrar cliente",
            data: e,
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: "Cliente atualizado" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao atualizar cliente",
            data: e,
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: "Cliente removido" });
    } catch (e) {
        res.status(400).send({
            message: "Falha ao remover cliente",
            data: e,
        });
    }
};
