import { Router } from "express";
import { TurmaController } from "../controller/turmaController";

const router = Router();

const turmaController = new TurmaController();

router.get("/", turmaController.findAll);
router.get("/:id", turmaController.findById);
router.post("/", turmaController.create);
router.put("/:id", turmaController.update);
router.delete("/:id", turmaController.delete);

export const turmaRouter = router;
