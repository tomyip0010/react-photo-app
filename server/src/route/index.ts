import * as express from 'express';
import albums from './albums';
import photos from './photos';
import photoDetail from './photoDetail';

const router = express.Router();

router.get('/albums', albums);
router.get('/photos/:photoId', photoDetail);
router.get('/photos', photos);

export default router;