import { Schema, model, Document } from 'mongoose';

enum Roles {
    admin = "admin",
    user = "user",
}

interface AuthDocument extends Document {
  username: string;
  password: string;
  authentication: {
	  password: string,
	  salt: string,
  };
  role: Roles;
}

const AuthSchema = new Schema<AuthDocument>({
	username:{type:String, required:true},
	authentication:{
		password:{type:String, required:true,select:false},
		salt:{type:String, required:true,select:false},
	},
	role:{type:String,required:true,enum:Roles}
})

export const AuthModel = model<AuthDocument>('Auth',AuthSchema);
export const getAuth = () => AuthModel.find();
export const getAuthByUsername = (username:string) => AuthModel.findOne({username});
export const getAuthById = (id: string) => AuthModel.findById(id);
export const createAuth = (values: Record<string, any>) => new AuthModel(values).save().then((auth)=>auth.toObject());
export const deleteAuthById= (id:string) => AuthModel.findOneAndDelete({_id:id});
export {AuthDocument,Roles};
