FROM fedora:38

WORKDIR /app

EXPOSE 8080:8080

COPY . /app/

RUN tar -xf openjdk-20.0.2_linux-x64_bin.tar.gz

ENV JAVA_HOME jdk-20.0.2

RUN ./mvnw package spring-boot:repackage 

ENTRYPOINT [ "./jdk-20.0.2/bin/java", "-jar", "target/EvasaoEscolar-0.0.1-SNAPSHOT.jar"] 
