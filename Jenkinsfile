pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose -f docker-compose-dev build'
            }
        }
        stage('Test') {
            steps {
                sh 'echo Test'
            }
        }
        stage('Deliver') {
            steps {
                sh 'docker-compose -f docker-compose-dev up -d'
            }
        }
    }
}