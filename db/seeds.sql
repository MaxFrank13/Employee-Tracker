INSERT INTO department (name)
VALUES ("Legal"),
       ("Marketing"),
       ("Finance"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 180000, 1),
       ("Law Consultant", 145000, 1),
       ("Salesperson", 120000, 2),
       ("Marketing Lead", 150000, 2),
       ("Accountant", 135000, 3),
       ("Backend Developer", 115000, 4),
       ("Web Developer", 95000, 4),
       ("Lead Engineer", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maxwell", "Frank", 7, 3),
       ("Sebastian", "Malone", 3, 1),
       ("Fred", "Cash", 4, 4),
       ("Herald", "Robes", 5, null),
       ("Dominique", "LeBlanc", 6, null),
       ("Floyd", "del Mar", 1, 2),
       ("Rachel", "Cruz", 2, null),
       ("Swan", "Bellevere", 8, null);