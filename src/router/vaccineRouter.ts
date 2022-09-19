import { Router } from 'express';
import * as vaccineController from '../controllers/vaccineController';

const router = Router();
router.post('/', vaccineController.createVaccine);
router.get('/', vaccineController.getAllVaccinesByUserId);
router.put('/:vaccineId', vaccineController.updateVaccine);
router.delete('/:vaccineId', vaccineController.deleteVaccine);
export default router;
