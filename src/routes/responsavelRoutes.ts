import { Router } from "express";
import { ResponsavelController } from "../controller/responsavelController";

const router = Router();

const responsavelController = new ResponsavelController();

router.get("/", responsavelController.findAll);
router.get("/:id", responsavelController.findById);
router.post("/", responsavelController.create);
router.put("/:id", responsavelController.update);
router.delete("/:id", responsavelController.delete);

export const responsavelRouter = router;
