-- Avenza DBMS Project
-- Demonstration queries for the existing MySQL implementation
-- Run against avenza_db.
-- These queries are read-only.

USE avenza_db;

-- 1. Route summaries
SELECT * FROM route_summary;

-- 2. Infrastructure ratings for each road segment
SELECT s.segment_id, s.road_name,
       si.lighting_level,
       si.road_condition_level,
       si.accessibility_level
FROM road_segments AS s
LEFT JOIN segment_infrastructure AS si
    ON s.segment_id = si.segment_id
ORDER BY s.segment_id;

-- 3. Incident counts by type and severity
SELECT incident_type, severity, COUNT(*) AS incident_count
FROM incidents
GROUP BY incident_type, severity
ORDER BY incident_type, severity;

-- 4. Segments with no infrastructure ratings
SELECT s.segment_id, s.road_name
FROM road_segments AS s
LEFT JOIN segment_infrastructure AS si
    ON s.segment_id = si.segment_id
WHERE si.segment_id IS NULL;

-- 5. Segments with their nearby transport stops
SELECT s.segment_id, s.road_name,
       ts.stop_name, ts.transport_type,
       st.distance_m
FROM segment_transport AS st
JOIN road_segments AS s
    ON st.segment_id = s.segment_id
JOIN transport_stops AS ts
    ON st.stop_id = ts.stop_id
ORDER BY s.segment_id, st.distance_m;

-- 6. Incidents for segment 1
CALL GetIncidentsBySegment(1);