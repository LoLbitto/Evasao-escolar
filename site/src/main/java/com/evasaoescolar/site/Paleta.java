package com.evasaoescolar.site;

import java.lang.reflect.Field;
import java.util.ArrayList;

public class Paleta {
    private Comum comum;
    private TemaEscuro temaEscuro;

    public Comum getComum() {
        return comum;
    }

    public void setComum(Comum comum) {
        this.comum = comum;
    }

    public TemaEscuro getTemaEscuro() {
        return temaEscuro;
    }

    public void setTemaEscuro(TemaEscuro temaEscuro) {
        this.temaEscuro = temaEscuro;
    }
}

abstract class VariaveisCSS {
    public ArrayList<String> pegarNomesVariaveis() {
        ArrayList<String> variaveis = new ArrayList<>();

        for (Field field : getClass().getDeclaredFields()) {
            variaveis.add(String.format("--%s", field.getName()));
        }

        return variaveis;
    }

    public String converterParaGetVariavel(String nomeVariavel) {
        String getNomeVariavel;

        getNomeVariavel = "get" + nomeVariavel.substring(2, 3).toUpperCase() + nomeVariavel.substring(3);

        return getNomeVariavel;
    }
}

class Comum extends VariaveisCSS {
    private String corBorda;
    private String corBordaAlternativa;
    private String corFundo;
    private String corFundoAlternativa;
    private String corFonte;
    private String corFonteAlternativa;
    private String corLink;
    private String corTituloGrupo;
    private String corHover;
    private String tamanhoFonteHeader;


    public String getCorBorda() {
        return corBorda;
    }

    public void setCorBorda(String corBorda) {
        this.corBorda = corBorda;
    }
    
    public String getCorBordaAlternativa() {
        return corBordaAlternativa;
    }

    public void setCorBordaAlternativa(String corBordaAlternativa) {
        this.corBordaAlternativa = corBordaAlternativa; 
    }

    public String getCorFundo() {
        return corFundo;
    }

    public void setCorFundo(String corFundo) {
        this.corFundo = corFundo;
    }

    public String getCorFundoAlternativa() {
        return corFundoAlternativa;
    }

    public void setCorFundoAlternativa(String corFundoAlternativa) {
        this.corFundoAlternativa = corFundoAlternativa;
    }

    public String getCorFonte() {
        return corFonte;
    }

    public void setCorFonte(String corFonte) {
        this.corFonte = corFonte;
    }

    public String getCorFonteAlternativa() {
        return corFonteAlternativa;
    }

    public void setCorFonteAlternativa(String corFonteAlternativa) {
        this.corFonteAlternativa = corFonteAlternativa;
    }

    public String getCorLink() {
        return corLink;
    }

    public void setCorLink(String corLink) {
        this.corLink = corLink;
    }

    public String getCorTituloGrupo() {
        return corTituloGrupo;
    }

    public void setCorTituloGrupo(String corTituloGrupo) {
        this.corTituloGrupo = corTituloGrupo;
    }

    public String getCorHover() {
        return corHover;
    }

    public void setCorHover(String corHover) {
        this.corHover = corHover;
    }

    public String getTamanhoFonteHeader() {
        return tamanhoFonteHeader;
    }

    public void setTamanhoFonteHeader(String tamanhoFonteHeader) {
        this.tamanhoFonteHeader = tamanhoFonteHeader;
    }
}

class TemaEscuro extends VariaveisCSS {
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
