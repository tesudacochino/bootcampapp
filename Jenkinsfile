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

        stage('Deploy') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                echo "end"
                script {
                     sshagent(credentials : ['deploy']) {
                        sh "echo pwd"
                        sh 'env'
                        sh 'ssh 192.168.1.120 "docker run --name my-container -d my-image"'
                        sh "echo pwd"
                        sh 'sudo -i -u root'
                        sh 'cd /opt/docker/web'
                        sh 'echo pwd'
                    }
                }
            }
        }
    }    
}
