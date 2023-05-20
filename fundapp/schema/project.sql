
use nextjs;

show tables;

create table Project(
    name varchar(255),
    description varchar(255),
    funding_goal int,
    funding_raised int,
    id int not null auto_increment,
    project_deadline date,
    created_at timestamp default current_timestamp,
    created_by int not null,
    primary key(id),
    foreign key(created_by) references User(id) on delete cascade on update cascade

);


desc Project;


-- show foriegn keys from Project;
-- SELECT 
--   TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
-- FROM
--   INFORMATION_SCHEMA.KEY_COLUMN_USAGE
-- WHERE
--   REFERENCED_TABLE_SCHEMA = '<database>' AND
--   REFERENCED_TABLE_NAME = '<table>';

-- select 
--     TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
-- from
--     INFORMATION_SCHEMA.KEY_COLUMN_USAGE
-- where
--     REFERENCED_TABLE_SCHEMA = 'nextjs' and
--     REFERENCED_TABLE_NAME = 'funding';
    