package com.evasaoescolar.site;

import com.alibaba.fastjson.JSON;
import org.springframework.ui.ModelMap;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.nio.file.Files;
import java.io.File;
import java.io.IOException;

public class Configuracao {
    private final String CAMINHO_LOGOS = "configuration/logos.json";
    private final String CAMINHO_INFORMACOES_ESCOLA = "configuration/informacoes_escola.json";
    private final String CAMINHO_PALETA = "configuration/paleta.json";

    private String lerArquivoJson(String filepath) {
        File jsonFile = new File(filepath);

        String conteudo;
        try {
            conteudo = new String(Files.readAllBytes(jsonFile.toPath()));
        } catch (IOException e) {
            return null;
        }

        return conteudo;
    }

    private Object configurarJson(String jsonData, Class<Object> objectClass) {
        return JSON.parseObject(jsonData, objectClass);
    }

    @SuppressWarnings("unchecked")
    public ArrayList<Object> configurar() {
        Object[][] configuracoes = {
            {lerArquivoJson(CAMINHO_LOGOS), Logos.class},
            {lerArquivoJson(CAMINHO_INFORMACOES_ESCOLA), InformacoesEscola.class},
            {lerArquivoJson(CAMINHO_PALETA), Paleta.class}
        };

        var dados = new ArrayList<>();

        for (var jsonObject: configuracoes) {
            dados.add(configurarJson((String) jsonObject[0], (Class<Object>) jsonObject[1]));
        }

        return dados;
    }

    public ModelMap configurarModelLogos(Logos logos, ModelMap model) {
        model.addAttribute("favicon", logos.getFavicon());
        model.addAttribute("maskicon", logos.getMaskIcon());
        model.addAttribute("logo-dark", logos.getLogoDarkMode());
        model.addAttribute("logo-light", logos.getLogoLightMode());
        
        return model;
    }

    private LinkedHashMap<String, String> pegarValoresVariaveis(ArrayList<String> nomes, VariaveisCSS variaveisCSS) {
        LinkedHashMap<String, String> valoresVariaveis = new LinkedHashMap<>();

        try {
            for (String nome: nomes) {
                Method metodoVariavel = variaveisCSS.getClass().getMethod(variaveisCSS.converterParaGetVariavel(nome)); 
                valoresVariaveis.put(nome, (String) metodoVariavel.invoke(variaveisCSS));
            }
        } catch (SecurityException | NoSuchMethodException | IllegalArgumentException | IllegalAccessException | InvocationTargetException e) {
            // TODO: Log erros
            e.printStackTrace();
        }

        return valoresVariaveis;
    } 

    public ModelMap configurarPaleta(Paleta paleta, ModelMap model) {
        ArrayList<String> nomesVariaveisComum = paleta.getComum().pegarNomesVariaveis();
        ArrayList<String> nomesVariaveisTemaEscuro = paleta.getTemaEscuro().pegarNomesVariaveis();

        var paletaComum = pegarValoresVariaveis(nomesVariaveisComum, paleta.getComum());
        var paletaTemaEscuro = pegarValoresVariaveis(nomesVariaveisTemaEscuro, paleta.getTemaEscuro());

        model.addAttribute("paletaComum", paletaComum);
        model.addAttribute("paletaTemaEscuro", paletaTemaEscuro);

        return model;
    }
}
