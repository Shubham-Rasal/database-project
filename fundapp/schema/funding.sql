show databases;

use nextjs;


show tables;

create table funding(
    project_id int not null,
    funder_id int not null,
    amount int not null,
    funded_on date not null,
    primary key(project_id, funder_id),
    foreign key(project_id) references project(id),
    foreign key(funder_id) references user(id)
);

desc funding;
