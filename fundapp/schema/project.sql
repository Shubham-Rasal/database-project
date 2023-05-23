
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

