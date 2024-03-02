FROM fedora:38

WORKDIR /app

EXPOSE 8080:8080

COPY . /app/

RUN tar -xf openjdk-20.0.2_linux-x64_bin.tar.gz

ENV JAVA_HOME jdk-20.0.2

RUN ./mvnw clean install spring-boot:repackage -pl site

ENTRYPOINT [ "./jdk-20.0.2/bin/java", "-jar", "site/target/evasao-escolar-site-1.0.jar"]
