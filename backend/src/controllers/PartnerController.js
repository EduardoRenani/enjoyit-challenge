const Partner = require("../models/Partner");

module.exports = {
    async index(req, res){
        const partners = await Partner.find({}).sort("-participation");
    
        return res.json(partners);
    },

    async store(req, res) {

        var partners
        var updatedPartners
        var responsePartners
        const newPartner = req.body

        try {
            partners = await Partner.find({}).sort("-participation");
        }
        catch(error) {
            return res.status(400).send(error)
        }

        const totalQuota = partners.reduce((prevVal, partner) => prevVal + partner.participation, 0);

        if (totalQuota < 100 - newPartner.participation) {
            updatedPartners = partners.map(function(partner) {
                const updatedPartner = partner.participation - (partner.participation * newPartner.participation)
                return updatedPartner
            })
        }
        else {
            updatedPartners = partners
        }

        updatedPartners.push(newPartner)
        
        try{
            responsePartners = await Partner.insertMany(updatedPartners)
        }
        catch(error){
            return res.status(400).send(error)
        }

        req.io.emit("NewPartner", responsePartners);

        return res.json(responsePartners);
    
    },

    async delete(req, res) {
        var partner

        try{
            partner = await Partner.findById(req.params.id);
        }
        catch(error) {
            return res.status(400).send(error)
        }

        partner.delete();
        req.io.emit("RemovePartner", partner);

        try {
            await partner.save();
        }
        catch(error){
            return res.status(400).send(error)
        }

        return res.json(partner);

    }
};