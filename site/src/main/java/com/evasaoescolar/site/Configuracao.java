package com.evasaoescolar.site;

import com.alibaba.fastjson.JSON;
import com.evasaoescolar.logger.JavaLogger;
import org.springframework.ui.ModelMap;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.nio.file.Files;
import java.io.File;
import java.io.IOException;
import java.util.logging.Logger;

public class Configuracao {

    private String caminhoLogos = "configuration/logos.json";
    private String caminhoInformacoesEscola = "configuration/informacoes_escola.json";
    private String caminhoPaleta = "configuration/paleta.json";
    private final Logger LOGGER = JavaLogger.getJavaLogger(Configuracao.class.getName());

    public Configuracao() {
        if (System.getProperty("user.dir").contains("site")) {
            caminhoLogos = "../" + caminhoLogos;
            caminhoInformacoesEscola = "../" + caminhoInformacoesEscola;
            caminhoPaleta = "../" + caminhoPaleta;
        }
    }

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
            {lerArquivoJson(caminhoLogos), Logos.class},
            {lerArquivoJson(caminhoInformacoesEscola), InformacoesEscola.class},
            {lerArquivoJson(caminhoPaleta), Paleta.class}
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
            LOGGER.warning(e.getMessage());
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
