const axios = require("axios");
const Dev = require("../models/Dev");
const StringParser = require("../utils/utils")

//index, show, store, update, destroy 

exports.index = async (req, res) => {
    const devs = await Dev.find();
    return res.json(devs);
}

exports.store = async (req,res) => {

    const { github_username, techs, latitude, longitude } = req.body;
    const gitApiRes = await axios.get(`https://api.github.com/users/${github_username}`);
    let dev = await Dev.findOne({github_username});

    if(!dev){

        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }

        let {name, login, avatar_url, bio} = gitApiRes.data;
        const techsArr = StringParser.parseStringToArr(techs);

        if(!name){
            name = login
        }

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs:  techsArr,
            location: location
        });
        return res.json(dev);
    };

    return res.json({"message": "User already exists"});
}

exports.destroy = async (req, res) => {
    const {name} = req.params;
    const dev = await Dev.findOne({name: name});

    if(dev){
        await dev.deleteOne();
        return res.json({"dev": "Dev deleted"});
    }
    return res.json({"dev": "Not Found"});
}

exports.update = async (req, res) => {
    const {techs, name, newName} = req.body;
    const dev = await Dev.findOne({name: name});

    const arrTechs = StringParser.parseStringToArr(techs);
    if(dev){
        await Dev.updateOne(dev, {$set: {techs: arrTechs, name: newName}});
        return res.json({"success": "User updated"});
    }
    return res.json({"dev": "Not Found"});
}




