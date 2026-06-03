import { Router } from "express";
import { RegistroEntradaSaidaController } from "../controller/registroEntradaSaidaController";

const router = Router();

const registroController = new RegistroEntradaSaidaController();

router.get("/", registroController.findAll);
router.get("/:id", registroController.findById);
router.post("/", registroController.create);
router.put("/:id", registroController.update);
router.delete("/:id", registroController.delete);

export const registroEntradaSaidaRouter = router;
