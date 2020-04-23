import {MigrationInterface, QueryRunner} from "typeorm";

const up = `
create table manufacturers
(
    id    uuid default uuid_generate_v4() not null
        constraint "PK_138520de32c379a48e703441975"
            primary key,
    name  varchar(125)                    not null,
    phone varchar(25)                     not null,
    serit bigint                          not null
);
`

const down = `
    drop table if exists manufacturers
`

export class createManufacturerTable1587564018919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(up)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
       return queryRunner.query(down)
    }

}
