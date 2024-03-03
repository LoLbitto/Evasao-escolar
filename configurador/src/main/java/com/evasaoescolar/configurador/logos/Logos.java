package com.evasaoescolar.configurador.logos;

import com.evasaoescolar.configurador.InformacoesJSON;

public class Logos extends InformacoesJSON {
    private String favicon;
    private String logoDarkMode;
    private String logoLightMode;
    private String maskIcon;

    public String getFavicon() {
        return favicon;
    }

    public void setFavicon(String favicon) {
        this.favicon = favicon;
    }

    public String getLogoDarkMode() {
        return logoDarkMode;
    }

    public void setLogoDarkMode(String logoDarkMode) {
        this.logoDarkMode = logoDarkMode;
    }

    public String getLogoLightMode() {
        return logoLightMode;
    }

    public void setLogoLightMode(String logoLightMode) {
        this.logoLightMode = logoLightMode;
    }

    public String getMaskIcon() {
        return maskIcon;
    }

    public void setMaskIcon(String maskIcon) {
        this.maskIcon = maskIcon;
    }
}
