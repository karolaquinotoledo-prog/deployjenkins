pipeline {
    agent any

    parameters {
        choice(name: 'DEPLOY_TYPE', 
               choices: ['blue-green', 'canary', 'rollback-blue'], 
               description: 'Selecciona la estrategia de despliegue')
    }

    stages {
        /*stage('Checkout') {
            steps {
                git 'https://github.com/karolaquinotoledo-prog/deployjenkins.git'
            }
        }*/

        stage('Build & Prepare') {
            steps {
                sh 'docker compose build'
                // Levantamos ambos para asegurar que estén listos
                sh 'docker compose up -d blue green nginx'
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    if (params.DEPLOY_TYPE == 'blue-green') {
                        echo "Cambiando tráfico totalmente a GREEN..."
                        sh 'cp nginx/nginx_green.conf nginx/nginx.conf'
                    } 
                    else if (params.DEPLOY_TYPE == 'canary') {
                        echo "Activando modo CANARY (80% Blue - 20% Green)..."
                        sh 'cp nginx/nginx_canary.conf nginx/nginx.conf'
                    }
                    
                    // Recargar Nginx sin tirar el contenedor
                    sh 'docker exec nginx_lb nginx -s reload'
                }
            }
        }
    }
    
    post {
        always {
            echo "Proceso finalizado."
        }
    }
}