import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateNotiTableAddColsCreatedAtUpdatedAt1708081491051
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("noti", [
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
    await queryRunner.dropColumns("noti", ["createdAt", "updatedAt"]);
  }
}
