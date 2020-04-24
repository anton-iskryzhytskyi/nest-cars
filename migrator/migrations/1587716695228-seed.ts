import {MigrationInterface, QueryRunner} from "typeorm";

const up = `
INSERT INTO manufacturers (id, name, phone, serit) VALUES ('3ee97a4f-c002-4e0e-a604-374c441a1000', 'One', '380112220001', 1);
INSERT INTO manufacturers (id, name, phone, serit) VALUES ('3ee97a4f-c002-4e0e-a604-374c441a1001', 'Two', '380112220002', 2);
INSERT INTO manufacturers (id, name, phone, serit) VALUES ('3ee97a4f-c002-4e0e-a604-374c441a1002', 'Three', '380112220003', 3);
INSERT INTO manufacturers (id, name, phone, serit) VALUES ('3ee97a4f-c002-4e0e-a604-374c441a1003', 'Four', '380112220004', 4);
INSERT INTO manufacturers (id, name, phone, serit) VALUES ('3ee97a4f-c002-4e0e-a604-374c441a1004', 'Five', '380112220005', 5);

INSERT INTO cars (price, first_registration_date, manufacturer_id) VALUES (200.00, '2020-01-01', '3ee97a4f-c002-4e0e-a604-374c441a1000');
INSERT INTO cars (price, first_registration_date, manufacturer_id) VALUES (300.00, '2020-01-01', '3ee97a4f-c002-4e0e-a604-374c441a1001');
INSERT INTO cars (price, first_registration_date, manufacturer_id) VALUES (400.00, '2020-01-01', '3ee97a4f-c002-4e0e-a604-374c441a1002');
INSERT INTO cars (price, first_registration_date, manufacturer_id) VALUES (500.00, '2020-01-01', '3ee97a4f-c002-4e0e-a604-374c441a1003');
INSERT INTO cars (price, first_registration_date, manufacturer_id) VALUES (600.00, '2020-01-01', '3ee97a4f-c002-4e0e-a604-374c441a1004');
`

export class seed1587716695228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(up)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
