pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose -f docker-compose-dev.yml build'
            }
        }
        stage('Test') {
            steps {
                sh 'echo Test'
            }
        }
        stage('Deliver') {
            steps {
                sh 'docker-compose -f docker-compose-dev.yml up -d'
            }
        }
    }
}
