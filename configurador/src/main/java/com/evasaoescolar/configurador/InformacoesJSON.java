package com.evasaoescolar.configurador;

import com.alibaba.fastjson.JSONObject;
import java.lang.reflect.Field;

public abstract class InformacoesJSON {

    public JSONObject pegarCamposJSON() {
        JSONObject campos = new JSONObject();

        for (Field field: this.getClass().getDeclaredFields()) {
            Class<?> tipoField = field.getType();

            if (tipoField == String.class) {
                campos.put(field.getName(), "");
                continue;
            }

            if (tipoField == boolean.class) {
                campos.put(field.getName(), false);
            }
        }

        return campos;
    }

}