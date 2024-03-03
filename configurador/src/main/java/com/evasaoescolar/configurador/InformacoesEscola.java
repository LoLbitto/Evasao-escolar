package com.evasaoescolar.configurador;

import com.alibaba.fastjson.JSONObject;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class InformacoesEscola {

    private static Contato contato = new Contato();
    private static EnvioDeInformacoes envioDeInformacoes = new EnvioDeInformacoes();

    public static JSONObject pegarCamposJSON() {
        JSONObject campos = new JSONObject();

        try {
            for (Field field: InformacoesEscola.class.getDeclaredFields()) {
                field.setAccessible(true);
                Object valorField = field.get(field);
                Method fieldMethod = valorField.getClass().getMethod("pegarCamposJSON", new Class[]{});
                campos.put(field.getName(), fieldMethod.invoke(valorField));
            }
        } catch ( IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException e ) {
            e.printStackTrace();
        }

        return campos;
    }

}

class Contato extends InformacoesJSON {

    private String nomeEscola;
    private String endereco;
    private String[] telefones;
    private String[] emails;

}

class EnvioDeInformacoes extends InformacoesJSON {

    private boolean enviarPorEmail;
    private String email;

}
