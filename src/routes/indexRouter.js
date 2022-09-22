import Router from 'express'
import { getSystemInfo, getSystemInfoLog } from '../controllers/indexControllers.js'

const router = Router();

router.get('/info', getSystemInfo)
router.get('/infoconsolelog', getSystemInfoLog)
router.get("/random", (req, res)=>{
    const calc = fork("utils/calcRandoms.js");

    let cant = req.query.cant;

    if (isNaN(cant)){
        cant = 1000000;
    }
    
    calc.send(cant);

    calc.on('message', numbers=>{
        console.log("entro al calc.on")
        res.json(numbers);
    })
})

export default router;