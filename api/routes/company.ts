import { Router } from 'express';
const companyController = require("../controllers/companyController")

const companyRouter = Router()

companyRouter.post("/create", companyController.create)
companyRouter.get("/:id", companyController.index)
companyRouter.put("/update", companyController.update)
companyRouter.delete("/delete", companyController.delete)

module.exports = companyRouter