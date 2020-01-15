const Dev = require("../models/Dev");
const StringParser = require("../utils/utils")

module.exports = {
    async index (req, res){
        //Search all devs based on location and techs
       
        const {latitude, longitude, techs} = req.query; 
        const techsArr = StringParser.parseStringToArr(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArr,
            },
            location: {
                $near: {
                    $geometry : {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000
                }
            }
        });

        if(devs){
            return res.json({"devs": devs});
        }
        return res.json({"error": "No dev found" });
    }
}
