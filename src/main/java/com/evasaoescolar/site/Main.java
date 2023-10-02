package com.evasaoescolar.site;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
public class Main {
    @RequestMapping({"/", "/index", "/index.html","/home"})
    String home() {
        return "index";
    }

    @RequestMapping("/contato.html")
    String contato() {
        return "contato";
    }

    @RequestMapping("/formEstudantes.html")
    String formEstudantes() {
        return "formEstudantes";
    }

    @RequestMapping("/formEscola.html")
    String formEscola() {
        return "formEscola";
    }

    @RequestMapping("/formInfoEstudante.html")
    String formInfo() {
        return "formInfoEstudante";
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}