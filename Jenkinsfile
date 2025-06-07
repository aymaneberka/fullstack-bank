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

        stage('Install Backend Dependencies') {
            steps {
                dir('app/backend') {
                    bat "npm install"
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('app/frontend') {
                    bat "npm install"
                }
            }
        }

        stage('Start Database Container') {
            steps {
                dir('app') {
                    bat "docker-compose up -d db"
                }
            }
        }

        stage('Wait for Database Ready') {
            steps {
                powershell '''
                    $port = 3002
                    $maxRetries = 30
                    $count = 0
                    while ($count -lt $maxRetries) {
                        try {
                            $tcp = New-Object System.Net.Sockets.TcpClient('localhost', $port)
                            if ($tcp.Connected) {
                                Write-Host "PostgreSQL is ready on port $port!"
                                $tcp.Close()
                                exit 0
                            }
                        } catch {
                            Write-Host "Port $port not ready yet, retrying..."
                        }
                        Start-Sleep -Seconds 2
                        $count++
                    }
                    throw "Timeout: PostgreSQL not ready after 60 seconds."
                '''
            }
        }

        stage('Compile Backend (TypeScript)') {
            steps {
                dir('app/backend') {
                    bat "npx tsc"
                }
            }
        }

        stage('Database Migrate & Seed') {
            steps {
                dir('app/backend') {
                    bat "npx sequelize-cli db:migrate"
                    bat "npx sequelize-cli db:seed:all"
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('app/backend') {
                    bat "npm run test"
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('app/frontend') {
                    bat "npm run test"
                }
            }
        }

        stage('Deploy Application Containers') {
            steps {
                dir('app') {
                    bat '''
                    docker-compose down
                    docker-compose build --no-cache
                    docker-compose up -d
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}fait les changement necessaire 
pour fixer probleme de la base de donnes
