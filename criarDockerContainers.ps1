$arquivo='openjdk-20.0.2_linux-x64_bin.tar.gz'

if (-not(Test-Path -Path $arquivo -PathType Leaf )) {
    Invoke-WebRequest https://download.java.net/java/GA/jdk20.0.2/6e380f22cbe7469fa75fb448bd903d8e/9/GPL/openjdk-20.0.2_linux-x64_bin.tar.gz -OutFile openjdk-20.0.2_linux-x64_bin.tar.gz
} else {
    Write-Host "OpenJDK já foi baixado"
}

$hashEsperado=(Get-Content 'openjdk sha-256 checksum.txt').Split(' ')[0].ToUpper()
$hashArquivo=(Get-FileHash openjdk-20.0.2_linux-x64_bin.tar.gz).Hash

if ($hashEsperado -ne $hashEsperado) {
    Write-Host "Algo aconteceu com o arquivo!"
    Exit
} 

docker compose -f "docker-compose.yaml" up -d --build
