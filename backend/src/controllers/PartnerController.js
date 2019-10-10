const Partner = require("../models/Partner");

module.exports = {
    async index(req, res){
        const partners = await Partner.find({}).sort("-participation");
    
        return res.json(partners);
    },

    async store(req, res) {

        var updatedPartners

        const newPartner = req.body
        const partners = await Partner.find({}).sort("-participation");

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
        
        const serverPartners = await Partner.insertMany(updatedPartners)
        
        req.io.emit("NewPartner", serverPartners);

        return res.json(serverPartners);
    
    },

    async delete(req, res) {
    
        const partner = await Partner.findById(req.params.id);

        partner.delete();
        req.io.emit("RemovePartner", partner);

        await partner.save();

        return res.json(partner);

    }
};