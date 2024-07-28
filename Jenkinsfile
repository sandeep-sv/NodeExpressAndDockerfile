pipeline {
  environment {
    imagename = "sandeepsv07/c0868022-assignment-4"
    registryCredential = 'dockerhubaccount'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git([url: 'https://github.com/sandeep-sv/NodeExpressAndDockerfile.git', branch: 'main'])
      }
    }
    stage('Building docker image') {
      steps {
        script {
          def retries = 3
          def success = false
          for (int i = 0; i < retries; i++) {
            try {
              dockerImage = docker.build(imagename)
              success = true
              break
            } catch (Exception e) {
              echo "Attempt ${i+1} failed, retrying..."
              sleep(10) // wait 10 seconds before retrying
            }
          }
          if (!success) {
            error "Failed to build Docker image after ${retries} attempts"
          }
        }
      }
    }
    stage('Deploy docker Image') {
      steps {
        script {
          docker.withRegistry('', registryCredential) {
            dockerImage.push("$BUILD_NUMBER")
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps {
        sh "docker rmi $imagename:$BUILD_NUMBER"
        sh "docker rmi $imagename:latest"
      }
    }
  }
}
