import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateNotiTableModifyColId1708093252261
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "noti",
      "id",
      new TableColumn({
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "noti",
      "id",
      new TableColumn({
        name: "id",
        type: "int",
        isGenerated: true,
        generationStrategy: "uuid",
      })
    );
  }
}
