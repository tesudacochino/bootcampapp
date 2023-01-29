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
                withEnv(["DOCKER_HOST=root@192.168.1.120"]) {
                    sshagent( credentials: ['deploy']) {
                        sh "docker -h 192.168.1.120 ps"
                    }
                }
            }
        }
        
    }
}
