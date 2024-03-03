package com.evasaoescolar.configurador;

import com.alibaba.fastjson.JSONObject;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public abstract class InformacoesAninhadasJSON {

    private String pegarNomeGetter(String nomePropriedade) {
        return "get" + nomePropriedade.substring(0, 1).toUpperCase() + nomePropriedade.substring(1);
    }

    public JSONObject pegarCamposAninhadosJSON() {
        JSONObject campos = new JSONObject();

        try {
            for (Field field: getClass().getDeclaredFields()) {
                field.setAccessible(true);
                String nomeGetter = pegarNomeGetter(field.getName());
                Method methodGet = getClass().getMethod(nomeGetter);
                Object objetoField = methodGet.invoke(this);
                Method fieldMethod = objetoField.getClass().getMethod("pegarCamposJSON");
                campos.put(field.getName(), fieldMethod.invoke(objetoField));
            }
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
            e.printStackTrace();
        }

        return campos;
    }
}
