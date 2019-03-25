import * as AWS from "aws-sdk";

export class Register {

    constructor(private name:String, private phone:String, private email:String, private rut:String) {
    }

    save = async () =>{
        const docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: "Register",
            Item: {
                "name":  this.name,
                "phone": this.phone,
                "email":  this.email,
                "rut": this.rut,
                "date": new Date().toLocaleString(),
            }
        };
        const exist = await docClient.get({TableName: params.TableName, Key: { "email": params.Item.email, "name": params.Item.name }}).promise();
        if(exist.Item){
            return {
                response:{
                    err: false,
                    code: 2,
                    message: "exist"
                }
            };
        }

        const data = await docClient.put(params).promise();
        if(data){
            return {
                response:{
                    err: false,
                    code: 1,
                    message: "success"
                }
            };
        }
        

    }
}
