USE company_db;

INSERT INTO department (id, name)
VALUES (01, "Support"),
       (02, "R&D"),
       (03, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Support Rep", 72500, 01),
       (02, "Senior Support Rep", 91000, 01),
       (03, "Junior Dev", 110000, 02),
       (04, "Senior Dev", 125000, 02),
       (05, "Account Rep", 150000, 03),
       (06, "Senior Account Rep", 200000, 03);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (01, "John", "Doe", 02, NULL),
       (02, "Jane", "Doe", 01, 01),
       (03, "America", "Lopez", 04, NULL),
       (04, "Cory", "Wurtenberger", 03, 03),
       (05, "Cirie", "Fields", 06, NULL),
       (06, "Izzy", "Fields", 05, 05);
