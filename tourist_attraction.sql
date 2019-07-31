/*
SQLyog Professional v12.5.1 (32 bit)
MySQL - 5.7.27-0ubuntu0.18.04.1 : Database - tourist_attraction
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tourist_attraction` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `tourist_attraction`;

/*Table structure for table `Categories` */

DROP TABLE IF EXISTS `Categories`;

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `thumbnail` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8;

/*Data for the table `Categories` */

insert  into `Categories`(`id`,`name`,`description`,`thumbnail`,`createdAt`,`updatedAt`) values 
(217,'Natural Tourism','Playground in the Lampung area','e3f856be3aab029220f12ab990e2b73e.jpg','2019-06-22 05:11:27','2019-06-22 05:11:27'),
(218,'Beach','Beautiful beach in Lampung','pantai.jpg','2019-07-01 14:09:32','2019-07-01 14:09:34');

/*Table structure for table `SequelizeMeta` */

DROP TABLE IF EXISTS `SequelizeMeta`;

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `SequelizeMeta` */

insert  into `SequelizeMeta`(`name`) values 
('20190603074657-create-user.js'),
('20190603101410-create-category.js'),
('20190620090118-create-tourist-attractions.js'),
('20190620092554-create-tourist-gallery.js');

/*Table structure for table `TouristAttractions` */

DROP TABLE IF EXISTS `TouristAttractions`;

CREATE TABLE `TouristAttractions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `shortDescription` varchar(200) DEFAULT NULL,
  `description` text,
  `thumbnail` text,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `view` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `TouristAttractions_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

/*Data for the table `TouristAttractions` */

insert  into `TouristAttractions`(`id`,`categoryId`,`name`,`address`,`shortDescription`,`description`,`thumbnail`,`latitude`,`longitude`,`view`,`createdAt`,`updatedAt`) values 
(109,217,'Lembah Hijau','Bandar Lampung','Large outdoor park featuring waterslides & pools, zoo animals, carnival rides & live entertainment.','<p>Taman Wisata Lembah Hijau Lampung is a family tourism destination that is never deserted by tourists. Located in Bandar Lampung, this place offers a means of education as well as natural recreation on an area of 30 hectares. Natural beauty combined with interesting rides in this place does not stop pampering visitors.</p>\r\n<br>\r\n<p>There are many rides available in Lembah Hijau Lampung. There are water rides, outbound, camping places, game rides, to the water park. However, one of the most popular here is the Animal Park. In this park, visitors will see 465 animals from 65 species of animals.</p>','lembah-hijau-thumbnail.jpg','-5.4156691','105.2308687',1253,'2019-06-22 07:30:22','2019-06-22 07:31:14'),
(110,218,'Pahawang Island','Lampung Selatan','Pahawang Island, Hidden Tourism Paradise in Lampung','<p>Lampung apparently did not only have the famous Way Kambas. However, Lampung also has beautiful islands around the southernmost province of Sumatra. There is a beautiful Pahawang Island. Of course, beaches and beauty in the sea can be enjoyed by tourists.</p>\r\n<br>\r\n<p>To get to Pahawang Island, you can take a boat from Ketapang Pier. But before arriving at the Ketapang Pier located in Punduh Pidana District, Pesawaran Regency. From Bandar Lampung to the Ketapang Pier, which is a crossing pier to Pahawang Island, the distance is around 25 km with a travel time of around 1.5 to 2 hours. Along the way to Pesawaran, will pass through the hills and beaches. Pretty fun too, so the two-hour travel time is not felt.</p>\r\n<br>\r\n<p>Arriving at the Ketapang Pier, visitors or tourists are provided with snorkeling equipment namely scuba diving mask or glasses and breathing apparatus. In addition, tourists are also given buoys. So, before reaching Pahawang Island, tourists who take part in tour packages are equipped with a variety of equipment. Visitors can also buy waterproof protective bags for cell phones. Because, along the way to Pahawang Island, usually splashes of water from the sea waves. So that needs to be anticipated beforehand.</p>','pahawang.jpg','-5.3722235','105.2409694',2345,'2019-07-01 14:12:47','2019-07-01 14:12:49');

/*Table structure for table `TouristGalleries` */

DROP TABLE IF EXISTS `TouristGalleries`;

CREATE TABLE `TouristGalleries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `touristAttractionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tourist_attraction_id` (`touristAttractionId`),
  CONSTRAINT `TouristGalleries_ibfk_1` FOREIGN KEY (`touristAttractionId`) REFERENCES `TouristAttractions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

/*Data for the table `TouristGalleries` */

insert  into `TouristGalleries`(`id`,`title`,`thumbnail`,`touristAttractionId`,`createdAt`,`updatedAt`) values 
(49,'Waterboom','waterboom.jpg',109,'2019-06-26 21:42:19','2019-06-26 21:42:22'),
(50,'Kebun Binatang','kebun-binatang.jpg',109,'2019-06-26 21:44:00','2019-06-26 21:43:58'),
(51,'Seashore','pahawang-360.jpg',110,'2019-07-01 14:14:43','2019-07-01 14:14:45'),
(52,'Foodcourt','pahawang-foodcourt.jpg',110,'2019-07-01 14:16:05','2019-07-01 14:16:07');

/*Table structure for table `Users` */

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `Users` */

insert  into `Users`(`id`,`name`,`email`,`password`,`createdAt`,`updatedAt`) values 
(4,'Dwi randy H','dwirandyherdinanto@gmail.com','$2a$10$Qf9FCEof6aMWIfH5p8rtk.znG71pTeX8vomsp0Nb0kvjaPlIqJZYy','2019-06-03 09:31:05','2019-06-03 09:31:05');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
