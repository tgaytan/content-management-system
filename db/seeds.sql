USE company_db;

INSERT INTO department (id, name)
VALUES (01, "Executive"),
       (02, "Development"),
       (03, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES (01, "CEO", 300000, 01),
       (02, "Lead Developer", 200000, 02),
       (03, "Senior Developer", 180000, 02),
       (04, "Lead Sales Engineer", 150000, 03),
       (05, "Account Rep", 135000, 03);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (01, "Cirie", "Fields", 01, NULL),
       (02, "America", "Lopez", 02, 01),
       (03, "Cory", "Wurtenberger", 03, 02),
       (04, "Jag", "Bains", 04, 01),
       (05, "Bowie", "Jane", 05, 04);
