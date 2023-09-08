import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Permission1693984181194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'permission',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'name',
                type: 'varchar',
                isUnique: true,
              },
              // Add other permission-related columns here
            ],
          })
        );
    
        // Create foreign key to link Permission with Role
        await queryRunner.createForeignKey(
          'permission',
          new TableForeignKey({
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'role',
            onDelete: 'CASCADE', // Adjust as needed
          })
        );
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permission', 'FK_roleId_permission');

        await queryRunner.dropTable('permission');
    }

}
