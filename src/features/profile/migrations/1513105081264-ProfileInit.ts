import {MigrationInterface, QueryRunner} from "typeorm";

export class ProfileInit1513105081264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `profile` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `username` varchar(255) NOT NULL, `membershipId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `leanora`.`membership` CHANGE `passwordHash` `passwordHash` text(500) NOT NULL");
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `fk_9e781fb2189260b0264a5f41318` FOREIGN KEY (`membershipId`) REFERENCES `membership`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `fk_9e781fb2189260b0264a5f41318`");
        await queryRunner.query("ALTER TABLE `leanora`.`membership` CHANGE `passwordHash` `passwordHash` text(65535) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL");
        await queryRunner.query("DROP TABLE `profile`");
    }

}
