import prisma from "../prisma";

const User = {

    registerProvider: async (user:any, provider: string, providerAccountId: string) => {
        return await prisma.account.create({
            data: {
                provider,
                providerAccountId,
                userId: user.id
            }
        });
    },
    

}



export default User;
