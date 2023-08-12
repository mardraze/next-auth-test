import prisma from "./prisma";
import User from "./model/User";

class Session {

    user: any = null;

    getJwtObject() {
        if(this.user){
            return {
                "name": this.user.name,
                "email": this.user.email,
                "picture": this.user.image,
                "sub": this.user.id,
            };
        }
        return null;
    }

    getCookie() {
        return '1'; //JSON.stringify({id: this.user?.id || 0});
    }

    /*
    onExternalSignIn(message: any) {
        this.user = null;

        let providerAccountId:string = message.user?.id || '';
        let email:string = message.user?.email || '';
        let provider:string = message.account?.provider || '';
        let image:string = message.user?.image || '';
        let name:string = message.user?.name || '';

        if(providerAccountId && provider){
            Account.findOne({
                where: {provider, providerAccountId},
                include: {
                    model: User
                }
            }).then((account:Account | null) => {
                if(account && account.user){
                     this.user = account.user;
                }else if(email){
                    User.findOne({
                        where: {email}
                    }).then((user:User | null) => {
                        if(user){
                            user.registerProvider(provider, providerAccountId);
                            this.user = user;
                        }else if(email){
                            User.create({
                                email,
                                image,
                                name
                            }).then((user:User|null) => {
                                if(user){
                                    user.registerProvider(provider, providerAccountId);
                                    this.user = user;
                                }
                            }).catch((error) => {
                                console.log(error);
                            });
                        }
                    })
                }
            });
        }
    }
*/
    
    onExternalSignIn(message: any) {
        this.user = null;

        let providerAccountId:string = message.user?.id || '';
        let email:string = message.user?.email || '';
        let provider:string = message.account?.provider || '';
        let image:string = message.user?.image || '';
        let name:string = message.user?.name || '';

        if(providerAccountId && provider){
            prisma.account.findFirst({
                where: {provider, providerAccountId}, 
                include: {
                    user: true
                }
            }).then((account) => {
                if(account && account.user){
                   this.user = account.user;
                }else if(email){
                    prisma.user.findFirst({
                        where: {email}, 
                    }).then((user) => {
                        if(user){
                            User.registerProvider(user, provider, providerAccountId);
                            this.user = user;
                        }else if(email){
                            prisma.user.create({
                                data: {
                                    email,
                                    image,
                                    name
                                }
                            }).then((user) => {
                                if(user){
                                    User.registerProvider(user, provider, providerAccountId);
                                    this.user = user;
                                }
                            }).catch((error) => {                             
                                console.log(error);
                            });
                        }
                    })
                }
            });
        }
    }
}

const session = new Session();

export default session