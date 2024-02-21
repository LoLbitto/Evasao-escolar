package com.evasaoescolar.site;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
@SpringBootApplication
public class Main {

    private static Configurador configurador = new Configurador();
    private static ArrayList<Object> dados = configurador.configurar();
    private static Logos logos = (Logos) dados.get(0);

    @RequestMapping({"/", "/index", "/index.html","/home"})
    String home(ModelMap model) {
        model = configurador.configurarModelLogos(logos, model);

        return "index";
    }

    @RequestMapping({"/contato.html", "/contato"})
    String contato(ModelMap model) {
        model = configurador.configurarModelLogos(logos, model);

        return "contato";
    }

    @RequestMapping({"/formEstudantes.html", "/formEstudantes", "/formestudantes.html", "/formestudantes"})
    String formEstudantes(ModelMap model) {
        model = configurador.configurarModelLogos(logos, model);

        return "formEstudantes";
    }

    @RequestMapping({"/formEscola.html", "/formEscola", "/formescola.html", "/formescola"})
    String formEscola(ModelMap model) {
        model = configurador.configurarModelLogos(logos, model);

        return "formEscola";
    }

    @RequestMapping({"/formInfoEstudante.html", "/formInfoEstudantes", "/forminfoestudantes.html", "/forminfoestudantes"})
    String formInfo(ModelMap model) {
        model = configurador.configurarModelLogos(logos, model);

        return "formInfoEstudante";
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
