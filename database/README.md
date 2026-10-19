\# Avenza — Database Documentation



\## 1. Project Overview



Avenza is a database-driven pedestrian route assessment platform designed to evaluate routes using factors such as street lighting, road conditions, accessibility, pedestrian density, public transport availability, and community-reported safety incidents.



The project uses MySQL for structured relational data. MongoDB is planned for community-reported incident observations.



\*\*Important:\*\* The current route and incident records are synthetic demonstration data. They must not be treated as verified real-world safety information.



\## 2. Database Environment



\- \*\*Database:\*\* `avenza\_db`

\- \*\*DBMS:\*\* MySQL Community Server 8.0.33

\- \*\*Storage engine:\*\* InnoDB

\- \*\*Character set:\*\* `utf8mb4`

\- \*\*Collation:\*\* `utf8mb4\_0900\_ai\_ci`

\- \*\*Base tables:\*\* 10

\- \*\*View:\*\* `route\_summary`

\- \*\*Trigger:\*\* `trg\_infrastructure\_audit\_update`

\- \*\*Stored procedure:\*\* `GetIncidentsBySegment`



\## 3. Directory Structure



```text

Avenza/

└── database/

&#x20;   ├── README.md

&#x20;   ├── sql/

&#x20;   │   ├── 01\_schema\_ddl.sql

&#x20;   │   ├── 02\_existing\_data\_export.sql

&#x20;   │   ├── 07\_dml\_demo\_queries.sql

&#x20;   │   └── 08\_verification\_queries.sql

&#x20;   ├── evidence/

&#x20;   │   ├── schema/

&#x20;   │   ├── queries/

&#x20;   │   └── verification/

&#x20;   └── backups/

&#x20;       ├── avenza\_db\_backup.sql

&#x20;       └── avenza\_restore\_test.sql

```



The SQL files have different purposes:



\- `01\_schema\_ddl.sql` — exported current database definitions, including table structures and advanced database objects.

\- `02\_existing\_data\_export.sql` — exported records from the existing database. This is a data export, not the original hand-authored seed script.

\- `07\_dml\_demo\_queries.sql` — read-only demonstration queries covering route summaries, infrastructure ratings, incident aggregation, and transport-stop relationships.

\- `08\_verification\_queries.sql` — queries for checking row counts, integrity conditions, indexes, triggers, procedures, and views.



The schema and data exports were recovered from the live database because the original SQL implementation was created directly in MySQL Command Line Client.



\## 4. Relational Schema



The database contains ten base tables:



| Table | Purpose |

|---|---|

| `users` | User accounts, roles, and account status |

| `routes` | Predefined routes, their origins, destinations, and creators |

| `road\_segments` | Road-segment details and coordinates |

| `segment\_infrastructure` | Lighting, road-condition, and accessibility ratings |

| `pedestrian\_density` | Time-stamped pedestrian-density observations |

| `transport\_stops` | Public transport stops and their locations |

| `segment\_transport` | Relationships between road segments and transport stops |

| `incidents` | Safety incidents associated with road segments |

| `route\_segments` | Route composition and segment ordering |

| `infrastructure\_audit` | Records of infrastructure-rating changes |



Primary keys, foreign keys, uniqueness constraints, check constraints, and indexes support data integrity.



The associative tables `route\_segments` and `segment\_transport` implement many-to-many relationships. `segment\_infrastructure` stores infrastructure ratings for individual road segments.



The `source\_observation\_id` field in `incidents` is intended to identify a corresponding MongoDB observation. It is not a cross-database foreign key.



\## 5. Advanced Database Features



\### View: `route\_summary`



Summarizes routes by calculating the number of segments, total distance in metres, and estimated walking time.



The walking-time estimate assumes an average speed of 5 km/h. It is a simplified estimate, not a real-time navigation prediction.



\### Trigger: `trg\_infrastructure\_audit\_update`



An `AFTER UPDATE` trigger on `segment\_infrastructure` records changes to lighting, road condition, and accessibility ratings in `infrastructure\_audit`.



Null-safe comparisons are used to identify changes in values.



\### Stored procedure: `GetIncidentsBySegment`



Accepts a segment ID and returns the associated incidents, ordered by occurrence time in descending order.



Example:



```sql

CALL GetIncidentsBySegment(1);

```



\### Other demonstrated concepts



\- Transactions and rollback

\- Indexes and execution-plan inspection using `EXPLAIN`

\- Window functions, including `RANK()`

\- Joins and aggregate queries

\- Nested and correlated subqueries

\- `UNION`

\- NULL handling using `IS NULL` and `COALESCE`

\- DDL and DML operations



\## 6. Verified Dataset



The restored database was checked against the following expected row counts:



| Table | Expected rows |

|---|---:|

| `users` | 1 |

| `routes` | 6 |

| `road\_segments` | 15 |

| `route\_segments` | 28 |

| `segment\_infrastructure` | 15 |

| `pedestrian\_density` | 45 |

| `transport\_stops` | 10 |

| `segment\_transport` | 22 |

| `incidents` | 15 |

| `infrastructure\_audit` | 3 |

| \*\*Total\*\* | \*\*160\*\* |



The `route\_summary` view returned six routes with calculated distances and walking-time estimates.



Integrity checks previously returned no rows for:

\- Road segments missing infrastructure ratings

\- Routes without assigned segments

\- Incidents reported before their occurrence



These results describe the verified demonstration dataset, not a guarantee that all future application inputs will satisfy the same conditions.



\## 7. Backup and Restore



\### Original backup



The full database backup is stored at:



```text

C:\\Projects\\Avenza\\database\\backups\\avenza\_db\_backup.sql

```



It was created with MySQL 8.0.33 `mysqldump`, including schema, data, views, triggers, routines, and events.



The backup was restored into a separate database named `avenza\_restore\_test`. Verification confirmed:

\- Ten base tables and the `route\_summary` view were present.

\- All ten base-table row counts matched the expected dataset.

\- The infrastructure audit trigger was present.

\- The stored procedure definition was present.

\- The view definition was present.

\- The view returned six route summaries.

\- `CALL GetIncidentsBySegment(1)` returned the expected incident.



The original `avenza\_db` was not used as the restore target.



\### Create a new backup



From Windows CMD:



```cmd

"C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe" -u root -p --databases avenza\_db --routines --triggers --events --single-transaction --hex-blob --result-file="C:\\Projects\\Avenza\\database\\backups\\avenza\_db\_backup.sql"

```



Enter the database password when prompted. Do not hard-code passwords in scripts or documentation.



\### Restore into a test database



A restore should target a separate, verified test database. Do not import a dump containing `USE avenza\_db` statements into the original database when testing restoration.



The existing test copy was created by changing the executable database-name references to `avenza\_restore\_test`. It was then imported and verified separately.



\## 8. Evidence and Verification



The `evidence` directory is intended to contain captured SQL definitions, demonstration query outputs, and verification results.



The following commands are useful for collecting additional evidence:



```sql

SHOW CREATE TABLE incidents\\G

SHOW CREATE VIEW route\_summary\\G

SHOW TRIGGERS;

SHOW PROCEDURE STATUS WHERE Db = 'avenza\_db';

SHOW INDEX FROM incidents;

SELECT \* FROM route\_summary;

```



Save actual terminal output to the corresponding evidence directory. Do not label an empty or unverified file as completed evidence.



\## 9. Limitations and Outstanding Work



\- The original hand-authored seed-data and SQL command-history files were not recovered.

\- The current schema and data exports are generated from the live database.

\- The data contains synthetic demonstration records, not verified real-world safety reports.

\- Geographic continuity of route-segment sequences has not been verified.

\- MongoDB integration remains separate from the current MySQL implementation.

\- The application layer, API integration, and authentication/authorization must be verified independently.

\- The demonstration account contains a placeholder password hash and must not be treated as a production-ready credential.



\## 10. Reproducibility Notes



The exported SQL files preserve the current database implementation, but they should not be executed blindly against the working database.



For a fresh setup, first create and verify an empty test database, inspect the exported schema and data scripts, and test the complete execution sequence there before using them in another environment.



Database credentials must be supplied securely at runtime. Do not commit credentials, real passwords, or sensitive application configuration to version control.



\---



\*\*Project:\*\* Avenza

\*\*Database component:\*\* MySQL

\*\*Verified environment:\*\* MySQL Community Server 8.0.33 on Windows

\*\*Backup status:\*\* Exported and successfully restored into a separate test database
