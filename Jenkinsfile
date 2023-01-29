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
                    dockerImage = docker.build("molero/bootcamp-frontend:${env.BRANCH_NAME}-${env.BUILD_ID}","./client/")
                    
                }
            }
        }
        stage('Push docker image frontend') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    withDockerRegistry([ credentialsId: "dockerhub-mole", url: "" ]) 
                    {
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
                    dockerImage = docker.build("molero/bootcamp-backend:${env.BRANCH_NAME}-${env.BUILD_ID}","./server/")                    
                }
            }
        }
        stage('Push docker image backend') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    withDockerRegistry([ credentialsId: "dockerhub-mole", url: "" ]) 
                    {
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
                withEnv(["DOCKER_HOST=root@192.168.1.120"]) {
                    sshagent( credentials: ['deploy']) {
                        sh "docker ps"
                    }
                }
            }
        }
        
    }
}
