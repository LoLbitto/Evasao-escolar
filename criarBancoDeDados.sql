create database estudantes
default character set utf8
default collate utf8_general_ci;

use estudantes;

create table ALUNO(
`UF(Unidade Federativa/ Unidade da Federação)` VARCHAR(19),
`Cidade` VARCHAR(32), 
`Escola` VARCHAR(100),
`Estudante` TINYTEXT,
`Matrícula` INT ,
`Desempenho Escolar` TINYINT,
`Renda` DECIMAL (8, 2),
`Neuro Divergência` TINYINT,
`Situação` FLOAT DEFAULT NULL,
`ID` SMALLINT NOT NULL AUTO_INCREMENT ,
Primary key (`ID`)
)default charset = utf8;

create table ESCOLA(
`UF(Unidade Federativa/ Unidade da Federação)` VARCHAR(19),
`Cidade` VARCHAR(32),
`Escola` VARCHAR(100),
`Estudante` TINYTEXT,
`Matrícula` INT ,
`Desempenho Escolar` TINYINT,
`Neuro Divergência` TINYINT,
`Situação` FLOAT DEFAULT NULL,
`ID` SMALLINT NOT NULL AUTO_INCREMENT ,
Primary key (`ID`)
)default charset = utf8;

create user  'usuario_pj_evasao' @'localhost' identified by 'pãocombife';

grant select, insert, update on estudantes.ESCOLA to  'usuario_pj_evasao' @'localhost';
grant select, insert, update on estudantes.DADOS to  'usuario_pj_evasao' @'localhost';
