import * as express from 'express';
import gallery from './gallery';
import album from './album';

const router = express.Router();

router.get('/gallery', gallery);
router.get('/album', album);

export default router;