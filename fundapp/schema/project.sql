show tables;

create table Project(
    name varchar(255),
    description varchar(255),
    funding_goal int,
    funding_raised int,
    id int not null auto_increment,
    primary key(id)
);

-- alter table Project add column project_deadline date;
-- alter table Project add column created_at timestamp default current_timestamp;
-- alter table Project add column created_by int not null;
alter table Project add foreign key (created_by) references User(id);

desc Project;
