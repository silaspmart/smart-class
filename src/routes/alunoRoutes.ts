import { Router } from "express";
import { AlunoController } from "../controller/alunoController";

const router = Router();

const alunoController = new AlunoController();

router.get("/", alunoController.findAll);
router.get("/:id", alunoController.findById);
router.post("/", alunoController.create);
router.put("/:id", alunoController.update);
router.delete("/:id", alunoController.delete);

export const alunoRouter = router;
