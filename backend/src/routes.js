const { Router} = require("express");
const DevController = require("./controllers/DevController");

const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/", (req,res) =>{
    return res.json({message: "Oministack API"});
});

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.put("/update", DevController.update);
routes.delete("/delete/:name", DevController.destroy);
routes.get("/search", SearchController.index);


routes.delete("/devs/:id", (req, res) => {
    console.log(req.params.id);
});



module.exports = routes;