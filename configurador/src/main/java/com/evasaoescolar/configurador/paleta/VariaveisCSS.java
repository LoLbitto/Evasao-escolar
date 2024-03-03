package com.evasaoescolar.configurador.paleta;

import java.lang.reflect.Field;
import java.util.ArrayList;

public interface VariaveisCSS {
    default ArrayList<String> pegarNomesVariaveis() {
        ArrayList<String> variaveis = new ArrayList<>();

        for (Field field: getClass().getDeclaredFields()) {
            variaveis.add(String.format("--%s", field.getName()));
        }

        return variaveis;
    }

    default String converterParaGetVariavel(String nomeVariavel) {
        String getNomeVariavel;

        return "get" + nomeVariavel.substring(2, 3).toUpperCase() + nomeVariavel.substring(3);
    }
}
