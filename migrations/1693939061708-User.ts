import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";


export class User1693939061708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },

                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                    },

                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },

                    {
                        name: 'password',
                        type: 'varchar',
                    },


                ],
            })
        )
        await queryRunner.addColumn(
            'user',
            new TableColumn({
              name: 'roles',
              type: 'json', // Adjust the column type as needed
              isArray: true, // Use this if 'roles' is an array
              default: '[]', // Optional default value
            })
          );
        

        await queryRunner.createForeignKey(
            'user',
            new TableForeignKey({
              columnNames: ['profileId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'profile',
              onDelete: 'CASCADE', // Adjust as needed
            })
            
     );
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user', 'FK_profileId_user');

        // Drop the user table
        await queryRunner.dropTable('user');
    }

}
