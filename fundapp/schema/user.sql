-- show databases;

-- use nextjs;

-- show tables;

create table User(
    name varchar(255),
    email varchar(255),
    password varchar(255),
    id int not null auto_increment,
    account_balance int,
    primary key(id)

);

-- alter table User add foreign key (id) references Project(created_by);
-- add on delete cascade on update cascade;

alter table User 


desc User;
