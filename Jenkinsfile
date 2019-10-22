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
                sh 'echo Build'
            }
        }
        stage('Test') {
            steps {
                sh 'echo Test'
            }
        }
        stage('Deliver') {
            steps {
                sh 'echo Deliver'
            }
        }
    }
}