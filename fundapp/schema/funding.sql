show databases;

use nextjs;


show tables;

-- create table funding(
--     project_id int not null,
--     funder_id int not null,
--     amount int not null,
--     funded_on date not null,
--     primary key(project_id, funder_id),
--     foreign key(project_id) references project(id),
--     foreign key(funder_id) references user(id)
-- );

-- desc funding;
-- DELIMITER $$
-- CREATE TRIGGER update_funding_raised
-- AFTER INSERT OR UPDATE ON funding
-- FOR EACH ROW
-- BEGIN
--     UPDATE project
--     SET funding_raised = funding_raised + NEW.amount
--     WHERE id = NEW.project_id;

--     UPDATE user
--     SET account_balance = account_balance + NEW.amount
--     WHERE id = (SELECT created_by FROM project WHERE id = NEW.project_id);
-- END$$
-- DELIMITER ;

-- DELIMITER $$
-- CREATE TRIGGER update_funding
-- AFTER UPDATE ON funding
-- FOR EACH ROW
-- BEGIN
--     UPDATE project
--     SET funding_raised = funding_raised + (NEW.amount - OLD.amount)
--     WHERE id = NEW.project_id;

--     UPDATE user
--     SET account_balance = account_balance + (NEW.amount - OLD.amount)
--     WHERE id = (SELECT created_by FROM project WHERE id = NEW.project_id);
    
-- END$$
-- DELIMITER ;

DELIMITER $$
CREATE TRIGGER insert_funding
AFTER INSERT ON funding
FOR EACH ROW
BEGIN
    UPDATE project
    SET funding_raised = funding_raised + NEW.amount
    WHERE id = NEW.project_id;

    UPDATE user
    SET account_balance = account_balance + NEW.amount
    WHERE id = (SELECT created_by FROM project WHERE id = NEW.project_id);
END$$
DELIMITER ;


