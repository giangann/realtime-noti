import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateNotiTableAddColIsRead1707928124511
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "noti",
      new TableColumn({
        name: "isRead",
        type: "tinyint",
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("noti", "isRead");
  }
}
