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

    private static Configuracao configuracao = new Configuracao();
    private static ArrayList<Object> dados = configuracao.configurar();
    private static Logos logos = (Logos) dados.get(0);
    private static InformacoesEscola informacoesEscola = (InformacoesEscola) dados.get(1);
    private static Paleta paleta = (Paleta) dados.get(2);
    private static Contato contato = informacoesEscola.getContato();

    @RequestMapping({"/", "/index", "/index.html","/home"})
    String home(ModelMap model) {
        model = configuracao.configurarModelLogos(logos, model);
        model = configuracao.configurarPaleta(paleta, model);

        return "index";
    }

    @RequestMapping({"/contato.html", "/contato"})
    String contato(ModelMap model) {
        model = configuracao.configurarModelLogos(logos, model);
        model = configuracao.configurarPaleta(paleta, model);
        model.addAttribute("nome", contato.getNomeEscola());
        model.addAttribute("endereco", contato.getEndereco());
        model.addAttribute("emails", contato.getEmails());
        model.addAttribute("telefones", contato.getTelefones());

        return "contato";
    }

    @RequestMapping({"/formEstudantes.html", "/formEstudantes", "/formestudantes.html", "/formestudantes"})
    String formEstudantes(ModelMap model) {
        model = configuracao.configurarModelLogos(logos, model);
        model = configuracao.configurarPaleta(paleta, model);

        return "formEstudantes";
    }

    @RequestMapping({"/formEscola.html", "/formEscola", "/formescola.html", "/formescola"})
    String formEscola(ModelMap model) {
        model = configuracao.configurarModelLogos(logos, model);
        model = configuracao.configurarPaleta(paleta, model);

        return "formEscola";
    }

    @RequestMapping({"/formInfoEstudante.html", "/formInfoEstudantes", "/forminfoestudantes.html", "/forminfoestudantes"})
    String formInfo(ModelMap model) {
        model = configuracao.configurarModelLogos(logos, model);
        model = configuracao.configurarPaleta(paleta, model);

        return "formInfoEstudante";
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
