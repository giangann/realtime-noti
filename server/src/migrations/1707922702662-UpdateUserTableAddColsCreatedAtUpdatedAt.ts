import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUserTableAddColsCreatedAtUpdatedAt1707922702662
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("user", [
      new TableColumn({
        name: "createdAt",
        type: "datetime",
        isNullable: true,
        default: "CURRENT_TIMESTAMP",
      }),
      new TableColumn({
        name: "updatedAt",
        type: "datetime",
        isNullable: true,
        default: "CURRENT_TIMESTAMP",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("user", ["createdAt", "updatedAt"]);
  }
}
