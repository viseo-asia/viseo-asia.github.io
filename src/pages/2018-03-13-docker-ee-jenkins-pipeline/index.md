---
path: "/docker-ee-jenkins-pipeline"
date: "2018-03-07"
title: "Docker Enterprise Edition Continuous Integration and Deployment"
tags: ["jenkins", "docker", "continuous integration", "continuous delivery"]
excerpt: "CI/CD technique using Jenkins Pipeline"
---

## Overview

This post will describe a technique to achieve Continuous Integration and Deployment in Docker Enterprise Edition using Jenkins Pipelines.

## TL;DR

1. Create a **jenkins** user in Docker Trusted Registry (DTR)
1. Create an application repository in DTR
2. Deploy a Docker Swarm Stack
3. Add a Jenkinsfile using Jenkins Pipelines to your application repository
4. Configure Jenkins DTR credenti[als
5. Commit code to application, build and deploy with Jenkins

## Detail

There's several ways to achieve CI and/or CD, often a key deciding factor is your application or business's governance policies.

For example can you use a CI/CD service or do you need to host your own.

For this post the CI/CD senario is that you cannot use an external service and the CaaS platform will be [Docker Enterprise Edition](https://www.docker.com/enterprise-edition).

There is essentially two parts: 1) Server configurations and 2) Application specific Jenkins pipeline scripting.

We have another reposistory that details the step by step setup for the server configurations which I'll link to [here](https://github.com/viseo-asia/docker-enterprise-edition-demo)

Once your server side is setup, we just need to drop in a Jenkinsfile in each application (or microservice) that we want to deploy.

Here's an exmaple that deploys a nodejs app.

At the root of your application repo add a [Jenkinsfile](https://github.com/viseo-asia/blockchain-civic-demo/blob/master/Jenkinsfile) like the one below.

Then you just need to create a new job in Jenkins and point it to your Jenkinsfile in your git repo.

This pipeline will:

1. Download the application code
2. Install dependencies
3. Execute unit tests and generate test coverage reports
4. Do code analysis and enforce quality rules like minimum percentage of test coverage
5. Build the docker image and tag it with the git commit id
6. Push the image to your local DTR
7. Deploy the image into your Docker swarm (Docker EE)

If you have any questions or issues that aren't resolved by the documentation we've written please contact us.

<pre class="prettyprint">pipeline {
    agent any
    
    environment {
        // NODE_ENV is dev for testing first, will prune dev dependencies before deploy.
        NODE_ENV = 'development'
    }
    
    stages {

        stage('Preparation') { 
            steps {
                git branch: 'master', url: 'https://github.com/viseo-asia/blockchain-civic-demo.git'
                script {
                    // sh 'printenv'
                    sh 'git rev-parse HEAD > .git/commit-id'
                }
            }
        }
        
        stage('Test') {
            steps {
                withDockerContainer(image: 'node:8.9.4-alpine') {
                    sh 'yarn install'
                    // sh 'printenv'
                    script {
                        commit_id = readFile('.git/commit-id')
                    }
                    echo "COMMIT ID: ${commit_id}"
                    sh 'npm run ci-test-coverage'
                    sh 'npm run ci-test-report'
                }
                script {
                    scannerHome = tool 'sonarqube';
                }
                withSonarQubeEnv('sonarqube') {
                    script {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        
        stage("Quality Gate") {
            steps {
                script {
                    qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
                    if (qg.status != 'OK') {
                       error "Pipeline aborted due to quality gate failure: ${qg.status}"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo "Git commit ID: ${commit_id}"
                script {
                    // the ${commit_id} tag seems to chop off anything trailing, so we build and tag seperately
                    sh "docker build -t viseo/civic-app ."
                    sh "docker tag viseo/civic-app local.dtr/viseo/civic-app:latest"
                    sh "docker tag viseo/civic-app local.dtr/viseo/civic-app:${commit_id}"

                }
            }
        }

        stage('Push') {
            steps {
                withDockerRegistry(url: 'https://local.dtr', credentialsId: 'dtr-credentials') {
                    // latest tag is not auto, so need to push twice - each layer is uploaded only once though (no double upload)
                    sh "docker push local.dtr/viseo/civic-app:latest"
                    sh "docker push local.dtr/viseo/civic-app:${commit_id}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker service update civic_web --detach=true --image local.dtr/viseo/civic-app:latest"
                }
            }
        }

    }
}</pre>
