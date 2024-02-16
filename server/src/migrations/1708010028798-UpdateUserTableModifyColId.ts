import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUserTableModifyColId1708010028798
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "user",
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
      "user",
      "id",
      new TableColumn({
        name: "id",
        type: "int",
        isPrimary: true,
        generationStrategy: "increment",
      })
    );
  }
}
