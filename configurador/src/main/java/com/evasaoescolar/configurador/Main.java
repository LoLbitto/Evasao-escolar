package com.evasaoescolar.configurador;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.evasaoescolar.configurador.informacoesescola.InformacoesEscola;
import com.evasaoescolar.configurador.logos.Logos;
import com.evasaoescolar.configurador.paleta.Paleta;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedHashMap;

public class Main {

    private static String pastaConfiguracoes = "configuration/";
    private static final InformacoesEscola INFORMACOES_ESCOLA = new InformacoesEscola();
    private static final Logos LOGOS = new Logos();
    private static final Paleta PALETA = new Paleta();
    private static final LinkedHashMap<String, JSONObject> BASE_INFORMACOES_ARQUIVOS = new LinkedHashMap<>();

    static {
        BASE_INFORMACOES_ARQUIVOS.put("informacoes_escola.json", INFORMACOES_ESCOLA.pegarCamposAninhadosJSON());
        BASE_INFORMACOES_ARQUIVOS.put("logos.json", LOGOS.pegarCamposJSON());
        BASE_INFORMACOES_ARQUIVOS.put("paleta.json", PALETA.pegarCamposAninhadosJSON());
    }

    public static void main(String[] args) {
        if (System.getProperty("user.dir").contains("configurador")) {
            pastaConfiguracoes = "../" + pastaConfiguracoes;
        }

        for (String nomeArquivo: BASE_INFORMACOES_ARQUIVOS.keySet()) {
            criarArquivoJSON(pastaConfiguracoes + nomeArquivo, BASE_INFORMACOES_ARQUIVOS.get(nomeArquivo));
        }
    }

    private static void criarArquivoJSON(String caminhoArquivo, JSONObject informacoesJSON) {
        try {
            File file = new File(caminhoArquivo);
            file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try(BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(caminhoArquivo))) {
           JSON.writeJSONString(bufferedWriter, informacoesJSON, SerializerFeature.PrettyFormat);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
