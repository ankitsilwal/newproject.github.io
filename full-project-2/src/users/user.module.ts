import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose"
import { UserSchema,User } from "./user.schema";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports : [MongooseModule.forFeature([{name :User.name, schema:UserSchema

    }]),

    JwtModule.register({
        secret:'test',
        signOptions :{expiresIn :'1h'},
    })

],
    
    providers :[UserService],
    exports : [UserService],
})



export class UserModule{}