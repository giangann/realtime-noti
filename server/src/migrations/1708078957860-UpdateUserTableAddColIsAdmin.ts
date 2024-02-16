import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUserTableAddColIsAdmin1708078957860
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "isAdmin",
        type: "tinyint",
        isNullable: true,
        default: "0",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "isAdmin");
  }
}
