show databases;

create database nextjs;

use nextjs;

show tables;

create table User(
    name varchar(255),
    email varchar(255),
    password varchar(255),
    id int not null auto_increment,
    account_balance int,
    primary key(id)

);



desc User;
