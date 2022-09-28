import { Router } from 'express';
import * as allergyController from '../controllers/allergyController';
import { validate } from '../middlewares/validate';
import allergySchema from '../validations/schemas/allergySchema';

const router = Router();
router.post('/', validate(allergySchema), allergyController.addAllergy);
router.get('/:vaccineId', allergyController.getAllAllergiesByVaccineId);
router.put('/:allergyId', validate(allergySchema), allergyController.updateAllergy);
router.delete('/:allergyId', allergyController.deleteAllergy);
export default router;
