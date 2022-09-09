import Router from 'express'
import { getSystemInfo, getSystemInfoLog } from '../controllers/indexControllers.js'

const router = Router();

router.get('/info', getSystemInfo)

router.get('/infoconsolelog', getSystemInfoLog)

export default router;