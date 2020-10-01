import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToMember1601590664540 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'members',
      new TableColumn({ name: 'profile_url', type: 'text', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('members', 'profile_url');
  }

}
