OPENJDK_TAR=./openjdk-20.0.2_linux-x64_bin.tar.gz

if [ -f "$OPENJDK_TAR" ]; then
    echo "OpenJDK já foi baixado"
else
    wget https://download.java.net/java/GA/jdk20.0.2/6e380f22cbe7469fa75fb448bd903d8e/9/GPL/openjdk-20.0.2_linux-x64_bin.tar.gz
fi

resultado_checksum=$(sha256sum -c openjdk\ sha-256\ checksum.txt)

if ! [ "$resultado_checksum" == "openjdk-20.0.2_linux-x64_bin.tar.gz: OK" ]; then
    echo "algum erro ocorreu"
    exit 1
fi

docker build --pull --rm -f "dockerfile" -t evasaoescolar:latest "."
