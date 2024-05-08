import { Router } from "express";
import postEntrar from "../controllers/postEntrar.js"
import getEntrar from "../controllers/getEntrar.js"
import getPainel from "../controllers/getPainel.js";
import postPainel from "../controllers/postPainel.js";
import refreshPass from "../controllers/refreshPass.js";
import getSchedulings from "../controllers/getSchedulings.js";
import deleteScheduling from "../controllers/deleteScheduling.js";
import getDateHour from "../controllers/getDateHour.js";
import getAdmin from "../controllers/getAdmin.js";

const router = Router();

router.get('/entrar', getEntrar);
router.post('/entrar', postEntrar);
router.get('/painel', getPainel);
router.post('/painel', postPainel);
router.put('/refresh-pass', refreshPass);
router.get('/api/schedulings', getSchedulings);
router.delete('/api/schedulings/:id', deleteScheduling);
router.get('/api/datehour', getDateHour);
router.get('/admin', getAdmin);

export default router;
