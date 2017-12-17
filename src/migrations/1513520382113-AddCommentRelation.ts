import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCommentRelation1513520382113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `leanora`.`comment` ADD `postId` int(11)");
        await queryRunner.query("ALTER TABLE `leanora`.`membership` CHANGE `passwordHash` `passwordHash` text(500) NOT NULL");
        await queryRunner.query("ALTER TABLE `leanora`.`comment` ADD CONSTRAINT `fk_3bcb1a6152c6f148be519b39bec` FOREIGN KEY (`postId`) REFERENCES `post`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `leanora`.`comment` DROP FOREIGN KEY `fk_3bcb1a6152c6f148be519b39bec`");
        await queryRunner.query("ALTER TABLE `leanora`.`membership` CHANGE `passwordHash` `passwordHash` text(65535) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL");
        await queryRunner.query("ALTER TABLE `leanora`.`comment` DROP `postId`");
    }

}
