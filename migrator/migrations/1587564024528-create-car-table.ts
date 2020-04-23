import {MigrationInterface, QueryRunner} from "typeorm";

const up = `
create table cars
(
    id                      uuid default uuid_generate_v4() not null
        constraint "PK_fc218aa84e79b477d55322271b6"
        primary key,
    price                   numeric(10, 2)                  not null,
    first_registration_date date default CURRENT_TIMESTAMP  not null,
    manufacturer_id         uuid
        constraint "FK_f6c27062077d25785bd1ac742b1"
        references manufacturers                   on delete restrict
);
`

const down = `
    drop table if exists cars
`

export class createCarTable1587564024528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(up)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(down)
    }

}
