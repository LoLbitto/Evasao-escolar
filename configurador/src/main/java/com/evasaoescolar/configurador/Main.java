package com.evasaoescolar.configurador;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedHashMap;

public class Main {

    private static String pastaConfiguracoes = "configuration/";
    private static final LinkedHashMap<String, JSONObject> baseInformacoesArquivos = new LinkedHashMap<>();

    public static void main(String[] args) {
        baseInformacoesArquivos.put("informacoes_escola.json", InformacoesEscola.pegarCamposJSON());
        baseInformacoesArquivos.put("logos.json", new Logos().pegarCamposJSON());
        baseInformacoesArquivos.put("paleta.json", Paleta.pegarCamposJSON());

        if (System.getProperty("user.dir").contains("configurador")) {
            pastaConfiguracoes = "../" + pastaConfiguracoes;
        }

        for (var nomeArquivo: baseInformacoesArquivos.keySet()) {
            criarArquivoJSON(pastaConfiguracoes + nomeArquivo, baseInformacoesArquivos.get(nomeArquivo));
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
