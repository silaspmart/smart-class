import { Router } from "express";
import { FrequenciaController } from "../controller/frequenciaController";

const router = Router();

const frequenciaController = new FrequenciaController();

router.get("/", frequenciaController.findAll);
router.get("/:id", frequenciaController.findById);
router.post("/", frequenciaController.create);
router.put("/:id", frequenciaController.update);
router.delete("/:id", frequenciaController.delete);

export const frequenciaRouter = router;
