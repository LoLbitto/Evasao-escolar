package com.evasaoescolar.configurador.paleta;

import com.alibaba.fastjson.JSONObject;
import com.evasaoescolar.configurador.InformacoesAninhadasJSON;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Paleta extends InformacoesAninhadasJSON {
    private Comum comum = new Comum();
    private TemaEscuro temaEscuro = new TemaEscuro();

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
