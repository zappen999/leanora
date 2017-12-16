import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1513429341221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `membership` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `identifier` varchar(255) NOT NULL UNIQUE, `passwordHash` text(500) NOT NULL) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profile` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `username` varchar(255) NOT NULL, `membershipId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `fk_9e781fb2189260b0264a5f41318` FOREIGN KEY (`membershipId`) REFERENCES `membership`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `fk_9e781fb2189260b0264a5f41318`");
        await queryRunner.query("DROP TABLE `profile`");
        await queryRunner.query("DROP TABLE `membership`");
    }

}
