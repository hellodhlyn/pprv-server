import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateReviewAndMember1600186538034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'reviews',
      columns: [
        { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true },
        { name: 'author_id', type: 'bigint' },
        { name: 'author_review_id', type: 'bigint' },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'text' },
        { name: 'score', type: 'smallint' },
        { name: 'description', type: 'text' },
        { name: 'thumbnail_url', type: 'text', isNullable: true },
        { name: 'publish_state', type: 'varchar', length: '20' },
        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
      indices: [
        { columnNames: ['author_id', 'author_review_id'], isUnique: true },
        { columnNames: ['publish_state', 'created_at'] },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'members',
      columns: [
        { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true },
        { name: 'username', type: 'varchar', length: '20' },
        { name: 'description', type: 'text', isNullable: true },
        { name: 'email', type: 'text' },
        { name: 'type', type: 'varchar', length: '20' },
        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
      indices: [
        { columnNames: ['username'], isUnique: true },
        { columnNames: ['email'], isUnique: true },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('members');
    await queryRunner.dropTable('reviews');
  }
}
