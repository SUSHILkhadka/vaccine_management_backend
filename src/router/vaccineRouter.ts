import { Router } from 'express';
import * as vaccineController from '../controllers/vaccineController';
import { validate } from '../middlewares/validate';
import vaccineSchema from '../validations/schemas/vaccineSchema';

const router = Router();
router.post('/', validate(vaccineSchema), vaccineController.createVaccine);
router.get('/', vaccineController.getAllVaccines);
router.put('/:vaccineId', validate(vaccineSchema), vaccineController.updateVaccine);
router.delete('/:vaccineId', vaccineController.deleteVaccine);
export default router;
