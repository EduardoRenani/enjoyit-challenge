const Partner = require("../models/Partner");
const partnerConstraints = require("../validate/constraints/partner")
var validate = require("validate.js");

module.exports = {
    async index(req, res){
        var partners

        try {
            partners = await Partner.find({}).sort("-participation");
        }
        catch(error) {
            return res.status(400).send(error)
        }

        return res.json(partners);
    },

    async store(req, res) {

        var partners = []
        var updatedPartners = []
        var newPartner = req.body
        
        //throw on invalid input
        try {
            inputError = validate(newPartner, partnerConstraints)
            if (inputError != null) throw inputError
        }
        catch(error) {
            return res.status(400).send(error)
        }

        //formatting valid input
        newPartner.participation = newPartner.participation.replace("%", "")
        if (Number(newPartner.participation) < 1) newPartner.participation = newPartner.participation * 100

        try {
            partners = await Partner.find({}).sort("-participation");
        }
        catch(error) {
            return res.status(400).send(error)
        }

        const totalQuota = partners.reduce((prevVal, partner) => prevVal + partner.participation, 0);
        
        if (newPartner.participation > (100 - totalQuota)) {
            updatedPartners = partners.map(function(partner) {
                const updatedPartner = partner.participation - (partner.participation * newPartner.participation)
                return updatedPartner
            })
        }
        else {
            updatedPartners = partners
        }

        try{
            await Partner.updateMany(updatedPartners)
            await Partner.create(newPartner)
        }
        catch(error){
            return res.status(400).send(error)
        }

        req.io.emit("NewPartner", newPartner);

        return res.json(newPartner);
    
    },

    async delete(req, res) {
        var partner

        try{
            partner = await Partner.findByIdAndDelete(req.params.id);
        }
        catch(error) {
            return res.status(400).send(error)
        }

        partner.delete();
        req.io.emit("RemovePartner", partner);

        return res.json(partner);

    }
};