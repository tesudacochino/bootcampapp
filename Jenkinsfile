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

        stage('Test') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                echo "end"
                script {
                     sshagent(credentials : ['deploy']) {
                        sh "echo pwd"
                        sh 'ssh -t -t  192.168.1.120 -o StrictHostKeyChecking=no'
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
