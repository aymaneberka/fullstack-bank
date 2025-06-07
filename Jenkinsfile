pipeline {
    agent any
    
    tools {
        nodejs 'node16'
    }
    
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/aymaneberka/fullstack-bank.git'
            }
        }
        
        stage('Convert EOL to LF') {
            steps {
                 bat '''
                    git config core.autocrlf false
                    git config core.eol lf
                    git add --renormalize .
                    '''
                }
        }

        stage('OWASP FS SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --nodeAuditSkipDevDependencies', odcInstallation: 'dc'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('TRIVY FS SCAN') {
            steps {
                bat 'C:\\Users\\HP\\trivy.exe fs ./'
            }
        }

        stage('SONARQUBE ANALYSIS') {
            steps {
                withSonarQubeEnv('sonar') {
                    bat "\"%SCANNER_HOME%\\bin\\sonar-scanner\" -Dsonar.projectKey=Bank -Dsonar.projectName=Bank"
                }
            }
        }

        stage('Install dependencies (racine)') {
            steps {
                bat "npm install"
            }
        }

        stage('Backend') {
            steps {
                dir('app/backend') {
                    bat "npm install"
                }
            }
        }

        stage('Frontend') {
            steps {
                dir('app/frontend') {
                    bat "npm install"
                }
            }
        }
        stage('Deploy to Container') {
            steps {
                bat '''
                cd app
                docker-compose down
                docker-compose build --no-cache
                docker-compose up -d
                '''
            }
        }

        stage('Run DB Migrations') {
            steps {
                dir('app/backend') {
                    bat "npx sequelize-cli db:migrate"
                    bat "npx sequelize-cli db:seed:all"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
