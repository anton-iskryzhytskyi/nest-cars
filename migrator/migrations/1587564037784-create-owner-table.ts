import {MigrationInterface, QueryRunner} from "typeorm";

const up = `
create table owners
(
    id           uuid default uuid_generate_v4() not null
        constraint "PK_42838282f2e6b216301a70b02d6"
        primary key,
    name         varchar(125)                    not null,
    purchased_at date default CURRENT_TIMESTAMP  not null,
    phone        varchar(25)                         null,
    serit        bigint                              null,
    car_id       uuid
        constraint "FK_f6c27062077d25785bd1aca276b"
        references cars                 on delete cascade
);
`
const down = `
    drop table if exists owners
`

export class createOwnerTable1587564037784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
       return queryRunner.query(up)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(down)
    }

}
