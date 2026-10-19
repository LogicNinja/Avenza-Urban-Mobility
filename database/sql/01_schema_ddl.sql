-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: avenza_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `avenza_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `avenza_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `avenza_db`;

--
-- Table structure for table `incidents`
--

DROP TABLE IF EXISTS `incidents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidents` (
  `incident_id` int NOT NULL AUTO_INCREMENT,
  `segment_id` int NOT NULL,
  `verified_by` int NOT NULL,
  `incident_type` varchar(30) NOT NULL,
  `severity` varchar(10) NOT NULL,
  `occurred_at` datetime NOT NULL,
  `reported_at` datetime NOT NULL,
  `source_observation_id` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`incident_id`),
  UNIQUE KEY `uq_incident_source` (`source_observation_id`),
  KEY `fk_incident_verifier` (`verified_by`),
  KEY `idx_incidents_segment_occurred` (`segment_id`,`occurred_at`),
  KEY `idx_incidents_type_severity` (`incident_type`,`severity`),
  CONSTRAINT `fk_incident_segment` FOREIGN KEY (`segment_id`) REFERENCES `road_segments` (`segment_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_incident_verifier` FOREIGN KEY (`verified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT,
  CONSTRAINT `chk_incident_severity` CHECK ((`severity` in (_utf8mb4'LOW',_utf8mb4'MEDIUM',_utf8mb4'HIGH'))),
  CONSTRAINT `chk_incident_times` CHECK ((`reported_at` >= `occurred_at`)),
  CONSTRAINT `chk_incident_type` CHECK ((`incident_type` in (_utf8mb4'THEFT',_utf8mb4'HARASSMENT',_utf8mb4'ACCIDENT',_utf8mb4'OTHER')))
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `infrastructure_audit`
--

DROP TABLE IF EXISTS `infrastructure_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infrastructure_audit` (
  `audit_id` int NOT NULL AUTO_INCREMENT,
  `segment_id` int NOT NULL,
  `field_name` varchar(30) NOT NULL,
  `old_value` tinyint DEFAULT NULL,
  `new_value` tinyint DEFAULT NULL,
  `changed_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`audit_id`),
  KEY `idx_audit_segment_changed` (`segment_id`,`changed_at`),
  CONSTRAINT `fk_audit_segment` FOREIGN KEY (`segment_id`) REFERENCES `road_segments` (`segment_id`) ON DELETE RESTRICT,
  CONSTRAINT `chk_audit_field_name` CHECK ((`field_name` in (_utf8mb4'lighting_level',_utf8mb4'road_condition_level',_utf8mb4'accessibility_level')))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedestrian_density`
--

DROP TABLE IF EXISTS `pedestrian_density`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedestrian_density` (
  `density_id` int NOT NULL AUTO_INCREMENT,
  `segment_id` int NOT NULL,
  `observed_at` datetime NOT NULL,
  `density_level` tinyint NOT NULL,
  `pedestrian_count` int DEFAULT NULL,
  PRIMARY KEY (`density_id`),
  UNIQUE KEY `uq_density_observation` (`segment_id`,`observed_at`),
  CONSTRAINT `fk_density_segment` FOREIGN KEY (`segment_id`) REFERENCES `road_segments` (`segment_id`) ON DELETE RESTRICT,
  CONSTRAINT `chk_density_level` CHECK ((`density_level` between 1 and 5)),
  CONSTRAINT `chk_pedestrian_count` CHECK ((`pedestrian_count` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `road_segments`
--

DROP TABLE IF EXISTS `road_segments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `road_segments` (
  `segment_id` int NOT NULL AUTO_INCREMENT,
  `road_name` varchar(100) NOT NULL,
  `start_lat` decimal(9,6) NOT NULL,
  `start_lon` decimal(9,6) NOT NULL,
  `end_lat` decimal(9,6) NOT NULL,
  `end_lon` decimal(9,6) NOT NULL,
  `length_m` int NOT NULL,
  PRIMARY KEY (`segment_id`),
  CONSTRAINT `chk_end_lat` CHECK ((`end_lat` between -(90) and 90)),
  CONSTRAINT `chk_end_lon` CHECK ((`end_lon` between -(180) and 180)),
  CONSTRAINT `chk_segment_distinct_endpoints` CHECK (((`start_lat` <> `end_lat`) or (`start_lon` <> `end_lon`))),
  CONSTRAINT `chk_segment_length` CHECK ((`length_m` > 0)),
  CONSTRAINT `chk_start_lat` CHECK ((`start_lat` between -(90) and 90)),
  CONSTRAINT `chk_start_lon` CHECK ((`start_lon` between -(180) and 180))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `route_segments`
--

DROP TABLE IF EXISTS `route_segments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_segments` (
  `route_id` int NOT NULL,
  `segment_id` int NOT NULL,
  `sequence_no` int NOT NULL,
  PRIMARY KEY (`route_id`,`segment_id`),
  UNIQUE KEY `uq_route_sequence` (`route_id`,`sequence_no`),
  KEY `fk_route_segments_segment` (`segment_id`),
  CONSTRAINT `fk_route_segments_route` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_route_segments_segment` FOREIGN KEY (`segment_id`) REFERENCES `road_segments` (`segment_id`) ON DELETE RESTRICT,
  CONSTRAINT `chk_sequence_no` CHECK ((`sequence_no` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `route_summary`
--

DROP TABLE IF EXISTS `route_summary`;
/*!50001 DROP VIEW IF EXISTS `route_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `route_summary` AS SELECT
 1 AS `route_id`,
 1 AS `route_name`,
 1 AS `origin`,
 1 AS `destination`,
 1 AS `segment_count`,
 1 AS `total_distance_m`,
 1 AS `estimated_travel_time_min`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `created_by` int NOT NULL,
  `route_name` varchar(100) NOT NULL,
  `origin` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`route_id`),
  UNIQUE KEY `uq_routes_name` (`route_name`),
  KEY `fk_routes_creator` (`created_by`),
  CONSTRAINT `fk_routes_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT,
  CONSTRAINT `chk_routes_different_locations` CHECK ((`origin` <> `destination`))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `segment_infrastructure`
--

DROP TABLE IF EXISTS `segment_infrastructure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `segment_infrastructure` (
  `segment_id` int NOT NULL,
  `lighting_level` tinyint NOT NULL,
  `road_condition_level` tinyint NOT NULL,
  `accessibility_level` tinyint NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`segment_id`),
  CONSTRAINT `fk_infrastructure_segment` FOREIGN KEY (`segment_id`) REFERENCES `road_segments` (`segment_id`) ON DELETE RESTRICT,
  CONSTRAINT `chk_accessibility_level` CHECK ((`accessibility_level` between 1 and 5)),
  CONSTRAINT `chk_lighting_level` CHECK ((`lighting_level` between 1 and 5)),
  CONSTRAINT `chk_road_condition_level` CHECK ((`road_condition_level` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_infrastructure_audit_update` AFTER UPDATE ON `segment_infrastructure` FOR EACH ROW BEGIN
    IF NOT (OLD.lighting_level <=> NEW.lighting_level) THEN
        INSERT INTO infrastructure_audit
            (segment_id, field_name, old_value, new_value)
        VALUES
            (NEW.segment_id, 'lighting_level',
             OLD.lighting_level, NEW.lighting_level);
    END IF;

    IF NOT (OLD.road_condition_level <=> NEW.road_condition_level) THEN
        INSERT INTO infrastructure_audit
            (segment_id, field_name, old_value, new_value)
        VALUES
            (NEW.segment_id, 'road_condition_level',
             OLD.road_condition_level, NEW.road_condition_level);
    END IF;

    IF NOT (OLD.accessibility_level <=> NEW.accessibility_level) THEN
        INSERT INTO infrastructure_audit
            (segment_id, field_name, old_value, new_value)
        VALUES
            (NEW.segment_id, 'accessibility_level',
             OLD.accessibility_level, NEW.accessibility_level);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `segment_transport`
--

DROP TABLE IF EXISTS `segment_transport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `segment_transport` (
  `segment_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `distance_m` int NOT NULL,
  PRIMARY KEY (`segment_id`,`stop_id`),
  KEY `fk_segment_transport_stop` (`stop_id`),
  CONSTRAINT `fk_segment_transport_segment` FOREIGN KEY (`segment_id`) REFERENCES `road_segments` (`segment_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_segment_transport_stop` FOREIGN KEY (`stop_id`) REFERENCES `transport_stops` (`stop_id`) ON DELETE RESTRICT,
  CONSTRAINT `chk_distance_to_stop` CHECK ((`distance_m` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transport_stops`
--

DROP TABLE IF EXISTS `transport_stops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_stops` (
  `stop_id` int NOT NULL AUTO_INCREMENT,
  `stop_name` varchar(100) NOT NULL,
  `transport_type` varchar(15) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  PRIMARY KEY (`stop_id`),
  CONSTRAINT `chk_stop_latitude` CHECK ((`latitude` between -(90) and 90)),
  CONSTRAINT `chk_stop_longitude` CHECK ((`longitude` between -(180) and 180)),
  CONSTRAINT `chk_transport_type` CHECK ((`transport_type` in (_utf8mb4'BUS',_utf8mb4'METRO',_utf8mb4'TRAIN',_utf8mb4'AUTO_STAND')))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_users_email` (`email`),
  CONSTRAINT `chk_users_role` CHECK ((`role` in (_utf8mb4'USER',_utf8mb4'ADMIN')))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'avenza_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `GetIncidentsBySegment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetIncidentsBySegment`(
    IN p_segment_id INT
)
BEGIN
    SELECT
        incident_id,
        segment_id,
        incident_type,
        severity,
        occurred_at,
        reported_at
    FROM incidents
    WHERE segment_id = p_segment_id
    ORDER BY occurred_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Current Database: `avenza_db`
--

USE `avenza_db`;

--
-- Final view structure for view `route_summary`
--

/*!50001 DROP VIEW IF EXISTS `route_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `route_summary` AS select `r`.`route_id` AS `route_id`,`r`.`route_name` AS `route_name`,`r`.`origin` AS `origin`,`r`.`destination` AS `destination`,count(`rs`.`segment_id`) AS `segment_count`,coalesce(sum(`s`.`length_m`),0) AS `total_distance_m`,round(((coalesce(sum(`s`.`length_m`),0) / 5000.0) * 60),2) AS `estimated_travel_time_min` from ((`routes` `r` left join `route_segments` `rs` on((`r`.`route_id` = `rs`.`route_id`))) left join `road_segments` `s` on((`rs`.`segment_id` = `s`.`segment_id`))) group by `r`.`route_id`,`r`.`route_name`,`r`.`origin`,`r`.`destination` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-10 20:14:42
