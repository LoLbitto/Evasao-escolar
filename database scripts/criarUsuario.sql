USE ESTUDANTES;

CREATE USER 'usuario_pj_evasao' @'localhost' IDENTIFIED BY 'pãocombife';

GRANT SELECT, INSERT, UPDATE ON ESCOLA TO  'usuario_pj_evasao' @'localhost';

GRANT SELECT, INSERT, UPDATE ON DADOS TO 'usuario_pj_evasao' @'localhost';
