pipeline {
    agent any

    parameters {
        choice(name: 'DEPLOY_TYPE', choices: ['blue-green', 'canary'], description: 'Tipo de despliegue')
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/lesantivanez/deployJenkins.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Blue') {
            steps {
                sh 'docker-compose up -d blue'
            }
        }

        stage('Deploy Green') {
            steps {
                sh 'docker-compose up -d green'
            }
        }

        stage('Switch Traffic') {
            steps {
                script {
                    if (params.DEPLOY_TYPE == 'blue-green') {
                        sh '''
                        sed -i 's/server blue:3000;/server green:3000;/' nginx/nginx.conf
                        docker-compose restart nginx
                        '''
                    } else {
                        sh '''
                        echo "Activando canary"
                        docker-compose restart nginx
                        '''
                    }
                }
            }
        }
    }
}