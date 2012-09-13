DROP TABLE USER;
DROP TABLE USER_PRIVS;
DROP TABLE MODULE;

CREATE TABLE IF NOT EXISTS USER(
	userID int(11) not null auto_increment,
	name varchar(50) not null,
	surname varchar(50) not null,
	nickname varchar(50) not null,
	password varchar(50) not null,
	email varchar(250) not null default '',
	telephone varchar(50) not null default '',
	fax varchar(50) not null default '',
	cellular varchar(50) not null default '',
	insertTimestamp timestamp not null default NOW(),
	userType enum('SUPERADMIN','ADMIN','USER','GUEST') not null default 'USER',
	
	primary key (userID),
	unique (email),
	unique (nickname)
)ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS MODULE(
	moduleID int(11) not null auto_increment,
	title varchar(50) not null,
	description varchar(1024) not null,
	startURL varchar(1024) not null,
	
	primary key (moduleID)
)ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS USER_PRIVS(
	userID int(11) not null,
	moduleID int(11) not null,

	primary key (userID,moduleID)
)ENGINE=InnoDB;