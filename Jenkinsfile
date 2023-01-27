pipeline {
    agent any
    stages {
       stage('Test') {
            steps {
                script {
                    def browsers = ['chrome', 'firefox']
                    for (int i = 0; i < browsers.size(); ++i) {
                        echo "Testing the ${browsers[i]} browser"
                    }
                }
           }
        }
        stage('Build frontend') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    dockerImage = docker.build("bootcamp-frontend:${env.BRANCH_NAME}-${env.BUILD_ID}","./client/")
                    
                }
            }
        }
        stage('Push docker image frontend') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    docker.withRegistry('http://localhost:5000') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Build backend') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    dockerImage = docker.build("bootcamp-backend:${env.BRANCH_NAME}-${env.BUILD_ID}","./server/")
                    
                }
            }
        }
        stage('Push docker backend') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    docker.withRegistry('http://localhost:5000') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Push docker image backend') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    docker.withRegistry('http://localhost:5000') {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy docker') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                echo "end"
                sshagent(credentials : ['use-the-id-from-credential-generated-by-jenkins']) {
                    sh 'ssh -o StrictHostKeyChecking=no user@hostname.com uptime'
                    sh 'ssh -v user@hostname.com'
                    sh 'scp ./source/filename user@hostname.com:/remotehost/target'
                }
            }
        }
    }
}
