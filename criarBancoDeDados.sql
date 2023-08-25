create database estudantes
default character set utf8
default collate utf8_general_ci;

use estudantes;

create table ALUNO(
`UF(Unidade Federativa/ Unidade da Federação)` varchar(19),
`Cidade` varchar(32), 
`Escola` varchar(100),
`Estudante` TINYTEXT,
`Matrícula` INT ,
`Desempenho Escolar` TINYINT,
`Renda` decimal (8, 2),
`Neuro Divergência` TINYINT,
`ID` smallint NOT NULL AUTO_INCREMENT ,
`Situação` TINYTEXT default null,
Primary key (`ID`)
)default charset = utf8;

create table ESCOLA(
`UF(Unidade Federativa/ Unidade da Federação)` varchar(19),
`Cidade` varchar(32),
`Escola` varchar(100),
`Estudante` TINYTEXT,
`Matrícula` INT ,
`Desempenho Escolar` TINYINT,
`Neuro Divergência` TINYINT,
`Situação` TINYTEXT default null,
`ID` smallint NOT NULL ,
Primary key (`ID`)
)default charset = utf8;

create user  'usuario_pj_evasao' @'localhost' identified by 'pãocombife';

grant select, insert, update on estudantes.ESCOLA to  'usuario_pj_evasao' @'localhost';
grant select, insert, update on estudantes.DADOS to  'usuario_pj_evasao' @'localhost';
