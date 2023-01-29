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
        stage('Deploy docker') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                echo "end"
                script {
                docker.withTool("default") {
                     withDockerServer([uri: 'tcp://192.168.1.120:2375', credentialsId: 'deploy']) {
                     sh "printenv"
                     sh "docker images"
                     sh 'docker ps'
                   }
                }
               }
            }
        }
        
    }
}
