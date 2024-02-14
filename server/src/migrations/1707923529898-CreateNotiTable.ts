import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateNotiTable1707923529898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "noti",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "from_user_id",
            type: "int",
          },
          {
            name: "to_user_id",
            type: "int",
          },
          {
            name: "content",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('noti')
  }
}
