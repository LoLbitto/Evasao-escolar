FROM fedora:38

WORKDIR /app

EXPOSE 8080:8080

COPY . /app/

RUN tar -xf openjdk-20.0.2_linux-x64_bin.tar.gz

ENV JAVA_HOME /app/jdk-20.0.2

RUN cd /app

CMD /app/mvnw spring-boot:run 
