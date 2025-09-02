import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        required: true,
        enum: ['admin', 'user', 'editor'], 
        default: 'user',
    })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hook to hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

