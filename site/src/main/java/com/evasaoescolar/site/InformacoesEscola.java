package com.evasaoescolar.site;

import java.util.ArrayList;

class Contato {
    private String nomeEscola;
    private String endereco;
    private ArrayList<String> telefones;
    private ArrayList<String> emails;

    public String getNomeEscola() {
        return nomeEscola;
    }

    public void setNomeEscola(String nomeEscola) {
        this.nomeEscola = nomeEscola;
    }

    public String getEndereco() {
        return endereco;
    };

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public ArrayList<String> getTelefones() {
        return telefones;
    }

    public void setTelefones(ArrayList<String> telefones) {
        this.telefones = telefones;
    }

    public ArrayList<String> getEmails() {
        return emails;
    }

    public void setEmails(ArrayList<String> emails) {
        this.emails = emails;
    }
}

class EnvioDeInformacoes {
    private boolean enviarPorEmail;
    private String email;

    public boolean getEnviarPorEmail() {
        return enviarPorEmail;
    }

    public void setEnviarPorEmail(boolean enviarPorEmail) {
        this.enviarPorEmail = enviarPorEmail;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

public class InformacoesEscola {
    private Contato contato;
    private EnvioDeInformacoes envioDeInformacoes;
    
    public Contato getContato() {
        return contato;
    }

    public void setContato(Contato contato) {
        this.contato = contato;
    }

    public EnvioDeInformacoes getEnvioDeInformacoes() {
        return envioDeInformacoes;
    }

    public void setEnvioDeInformacoes(EnvioDeInformacoes envioDeInformacoes) {
        this.envioDeInformacoes = envioDeInformacoes;
    }
}
