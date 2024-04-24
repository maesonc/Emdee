import { ObjectId,Schema, model, Document } from 'mongoose';

enum Gender{
	male="male",
	female="female",
}
interface UserDocument extends Document {
  email: string;
  contact: string;
  gender: Gender;
  address: string ;
  auth_id: ObjectId;
}

const UserSchema = new Schema<UserDocument>({
	email:{type:String, required:true},
	contact:{type:String, required:true},
	gender:{type:String,required:true,enum:Gender},
	address:{type:String,required:true},
	auth_id:{type:Schema.Types.ObjectId,required:true}
})

export const UserModel = model<UserDocument>('User',UserSchema);
export const getUser= () => UserModel.find();
export const getUserByAuthId = (auth_id: string) => UserModel.findById(auth_id);
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const createUser= (values: Record<string, any>) => new UserModel(values).save().then((user)=>user.toObject());
export {UserDocument,Gender};
