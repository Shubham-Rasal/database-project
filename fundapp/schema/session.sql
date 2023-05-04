
use nextjs;

show tables;

create table Session(
    id int not null auto_increment,
    user_id int,
    expires_at timestamp,    
    primary key(id)
);

alter table Session add foreign key (user_id) references User(id);



desc Session;
