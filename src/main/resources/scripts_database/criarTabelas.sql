CREATE TABLE IF NOT EXISTS ALUNO (
    `UF(Unidade Federativa/ Unidade da Federação)` VARCHAR(19),
    `Cidade` VARCHAR(32),
    `Escola` VARCHAR(100),
    `Estudante` TINYTEXT,
    `Matrícula` INT,
    `Desempenho Escolar` TINYINT,
    `Renda` VARCHAR(9),
    `Neuro Divergência` DECIMAL(2, 1),
    `Situação` FLOAT DEFAULT NULL,
    `ID` SMALLINT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`ID`)
) DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS  ESCOLA (
    `UF(Unidade Federativa/ Unidade da Federação)` VARCHAR(19),
    `Cidade` VARCHAR(32),
    `Escola` VARCHAR(100),
    `Estudante` TINYTEXT,
    `Matrícula` INT,
    `Desempenho Escolar` TINYINT,
    `Neuro Divergência` DECIMAL (2, 1),
    `Situação` FLOAT DEFAULT NULL,
    `ID` SMALLINT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`ID`)
) DEFAULT CHARSET = utf8;
