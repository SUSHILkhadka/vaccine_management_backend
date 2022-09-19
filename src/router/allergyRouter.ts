import { Router } from 'express';
import * as allergyController from '../controllers/allergyController';

const router = Router();
router.post('/', allergyController.addAllergy);
router.get('/:vaccineId', allergyController.getAllAllergiesByVaccineId);
router.put('/:allergyId', allergyController.updateAllergy);
router.delete('/:allergyId', allergyController.deleteAllergy);
export default router;
