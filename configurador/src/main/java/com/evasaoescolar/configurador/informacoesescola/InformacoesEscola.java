package com.evasaoescolar.configurador.informacoesescola;

import com.evasaoescolar.configurador.InformacoesAninhadasJSON;

public class InformacoesEscola extends InformacoesAninhadasJSON {

    private Contato contato = new Contato();
    private EnvioDeInformacoes envioDeInformacoes = new EnvioDeInformacoes();

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
