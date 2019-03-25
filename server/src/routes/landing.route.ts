import { Router, Request, Response } from 'express';
import { landing } from '../controllers/landing.controller';

const router = Router();

router.post('/subscriptions', (req: Request, res: Response) => {
    const landingObj = new landing();
    console.log( req.body );
    landingObj.addElement( req.body ).then( 
        (data) => res.json({data})
    ).catch((err) => res.json({err}));
});

export default router;