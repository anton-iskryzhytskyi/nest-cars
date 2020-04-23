import {MigrationInterface, QueryRunner} from "typeorm";

const up = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`

export class addExtensions1587563891337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(up)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
