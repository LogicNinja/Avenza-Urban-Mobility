-- Avenza DBMS Project
-- Verification queries for the current database

USE avenza_db;

-- 1. Row counts for all ten base tables
SELECT 'users' AS table_name, COUNT(*) AS row_count FROM users
UNION ALL SELECT 'routes', COUNT(*) FROM routes
UNION ALL SELECT 'road_segments', COUNT(*) FROM road_segments
UNION ALL SELECT 'route_segments', COUNT(*) FROM route_segments
UNION ALL SELECT 'segment_infrastructure', COUNT(*) FROM segment_infrastructure
UNION ALL SELECT 'pedestrian_density', COUNT(*) FROM pedestrian_density
UNION ALL SELECT 'transport_stops', COUNT(*) FROM transport_stops
UNION ALL SELECT 'segment_transport', COUNT(*) FROM segment_transport
UNION ALL SELECT 'incidents', COUNT(*) FROM incidents
UNION ALL SELECT 'infrastructure_audit', COUNT(*) FROM infrastructure_audit;

-- 2. Road segments missing infrastructure ratings
SELECT s.segment_id, s.road_name
FROM road_segments AS s
LEFT JOIN segment_infrastructure AS si
    ON s.segment_id = si.segment_id
WHERE si.segment_id IS NULL;

-- 3. Routes without assigned segments
SELECT r.route_id, r.route_name
FROM routes AS r
LEFT JOIN route_segments AS rs
    ON r.route_id = rs.route_id
WHERE rs.route_id IS NULL;

-- 4. Incidents reported before they occurred
SELECT incident_id, occurred_at, reported_at
FROM incidents
WHERE reported_at < occurred_at;

-- 5. Route summary view
SELECT * FROM route_summary;

-- 6. Index definitions
SHOW INDEX FROM incidents;

-- 7. Trigger definitions
SHOW TRIGGERS;

-- 8. Stored procedure definition
SHOW CREATE PROCEDURE GetIncidentsBySegment;

-- 9. View definition
SHOW CREATE VIEW route_summary;