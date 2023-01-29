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
                        sh "ssh -o StrictHostKeyChecking=no -t -t 192.168.1.203  'whoami'"
                        sh "ssh -o StrictHostKeyChecking=no -t -t 192.168.1.203  'mkdir /home/share/tmp'"
                        sh "ls -la"
                    }
                }
            }
        }
    }    
}
