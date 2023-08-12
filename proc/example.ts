import env from "./env";
process.env = env;
import prisma from "../lib/prisma";


prisma.user.findFirst().then((user) => {
    console.log(user);
}).catch((error) => {
    console.log(error);
});
