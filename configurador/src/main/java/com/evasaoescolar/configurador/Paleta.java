package com.evasaoescolar.configurador;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;

public class Paleta {
    private static Comum comum = new Comum();
    private static TemaEscuro temaEscuro = new TemaEscuro();

    public static JSONObject pegarCamposJSON() {
        JSONObject campos = new JSONObject();

        try {
            for (Field field : Paleta.class.getDeclaredFields()) {
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

class Comum extends InformacoesJSON {
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

}

class TemaEscuro  extends InformacoesJSON {
    private String corFundo;
    private String corFonte;
}
