import { Register } from "../models/register.model";

export class landing{

    constructor(){
    }

    addElement = async ( data:any ) =>{
        const elem = new Register(
            data.name,
            data.phone,
            data.email,
            data.rut
        );
        
        return await elem.save();
    }

    

}