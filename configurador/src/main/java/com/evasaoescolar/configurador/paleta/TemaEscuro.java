package com.evasaoescolar.configurador.paleta;

import com.evasaoescolar.configurador.InformacoesJSON;

class TemaEscuro  extends InformacoesJSON implements VariaveisCSS {
    private String corFundo;
    private String corFonte;

    public String getCorFundo() {
        return corFundo;
    }

    public void setCorFundo(String corFundo) {
        this.corFundo = corFundo;
    }

    public String getCorFonte() {
        return corFonte;
    }

    public void setCorFonte(String corFonte) {
        this.corFonte = corFonte;
    }
}