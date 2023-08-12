import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
//import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

export const sequelize = new Sequelize(process.env.DATABASE_URL || '');

/*
@Table({ tableName: 'user' })
export class User extends Model {

    @Column
    name!: string;

    @Column
    email!: string;

    @Column
    emailVerified!: Date;

    @Column
    image!: string;

    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;

    @HasMany(() => Account)
    accounts!: Account[];

    registerProvider(provider: string, providerAccountId: string) {
        return Account.create({
            provider,
            providerAccountId,
            userId: this.id
        });
    }
}

@Table({ tableName: 'account' })
export class Account extends Model {
    @Column
    userId!: number;

    @Column
    provider!: string;

    @Column
    providerAccountId!: string;
    
    @Column
    createdAt!: Date;

    @Column
    updatedAt!: Date;

    @HasOne(() => User)
    user!: User;

}

sequelize.addModels([User, Account]);
//sequelize.addModels([User]);
//User.sync();


sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});
*/

