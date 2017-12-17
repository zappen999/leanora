import {MigrationInterface, QueryRunner} from "typeorm";

export class Blog1513453919213 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `post` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `text` varchar(255) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `authorId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comment` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `text` varchar(255) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `authorId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `leanora`.`membership` CHANGE `passwordHash` `passwordHash` text(500) NOT NULL");
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `fk_b2ea91d8d5e355441c2da22d6cd` FOREIGN KEY (`authorId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `fk_e85452bdd9fbf1df7d268a4c251` FOREIGN KEY (`authorId`) REFERENCES `profile`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `fk_e85452bdd9fbf1df7d268a4c251`");
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `fk_b2ea91d8d5e355441c2da22d6cd`");
        await queryRunner.query("ALTER TABLE `leanora`.`membership` CHANGE `passwordHash` `passwordHash` text(65535) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL");
        await queryRunner.query("DROP TABLE `comment`");
        await queryRunner.query("DROP TABLE `post`");
    }

}
