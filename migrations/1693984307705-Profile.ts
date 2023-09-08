// src/migrations/1631243000000-CreateProfileTable.ts

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Profile1693984307705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profile',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'dateOfBirth',
            type: 'date',
            isNullable: true,
          },
          // Add other profile-related columns here
        ],
      })
    );

    // Create foreign key to link Profile with User
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
    // Drop foreign key
    await queryRunner.dropForeignKey('user', 'FK_profileId_user');

    // Drop the profile table
    await queryRunner.dropTable('profile');
  }
}

