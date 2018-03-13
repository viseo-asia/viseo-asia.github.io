webpackJsonp([0xfa3b6e99b149],{332:function(n,e){n.exports={data:{markdownRemark:{html:"<h2>Continuous Integration and Delivery using Jenkins Pipelines</h2>\n<p>This post will discuss a technique to achieve Continuous Integration and Deployment in Docker Enterprise Edition using Jenkins Pipelines.</p>\n<h2>TL;DR</h2>\n<ol>\n<li>Create a <strong>jenkins</strong> user in Docker Trusted Registry (DTR)</li>\n<li>Create an application repository in DTR</li>\n<li>Deploy a Docker Swarm Stack</li>\n<li>Add a Jenkinsfile using Jenkins Pipelines to your application repository</li>\n<li>Configure Jenkins DTR credentials</li>\n<li>Commit code to application, build and deploy with Jenkins</li>\n</ol>\n<p>Easy CI/CD with Jenkins Pipelines.</p>\n<pre class=\"prettyprint\">pipeline {\n    agent any\n    \n    environment {\n        // NODE_ENV is dev for testing first, will prune dev dependencies before deploy.\n        NODE_ENV = 'development'\n    }\n    \n    stages {\n\n        stage('Preparation') { \n            steps {\n                git branch: 'master', url: 'https://github.com/viseo-asia/blockchain-civic-demo.git'\n                script {\n                    // sh 'printenv'\n                    sh 'git rev-parse HEAD > .git/commit-id'\n                }\n            }\n        }\n        \n        stage('Test') {\n            steps {\n                withDockerContainer(image: 'node:8.9.4-alpine') {\n                    sh 'yarn install'\n                    // sh 'printenv'\n                    script {\n                        commit_id = readFile('.git/commit-id')\n                    }\n                    echo \"COMMIT ID: ${commit_id}\"\n                    sh 'npm run ci-test-coverage'\n                    sh 'npm run ci-test-report'\n                }\n                script {\n                    scannerHome = tool 'sonarqube';\n                }\n                withSonarQubeEnv('sonarqube') {\n                    script {\n                        sh \"${scannerHome}/bin/sonar-scanner\"\n                    }\n                }\n            }\n        }\n        \n        stage(\"Quality Gate\") {\n            steps {\n                script {\n                    qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv\n                    if (qg.status != 'OK') {\n                       error \"Pipeline aborted due to quality gate failure: ${qg.status}\"\n                    }\n                }\n            }\n        }\n\n        stage('Build') {\n            steps {\n                echo \"Git commit ID: ${commit_id}\"\n                script {\n                    // the ${commit_id} tag seems to chop off anything trailing, so we build and tag seperately\n                    sh \"docker build -t viseo/civic-app .\"\n                    sh \"docker tag viseo/civic-app local.dtr/viseo/civic-app:latest\"\n                    sh \"docker tag viseo/civic-app local.dtr/viseo/civic-app:${commit_id}\"\n\n                }\n            }\n        }\n\n        stage('Push') {\n            steps {\n                withDockerRegistry(url: 'https://local.dtr', credentialsId: 'dtr-credentials') {\n                    // latest tag is not auto, so need to push twice - each layer is uploaded only once though (no double upload)\n                    sh \"docker push local.dtr/viseo/civic-app:latest\"\n                    sh \"docker push local.dtr/viseo/civic-app:${commit_id}\"\n                }\n            }\n        }\n\n        stage('Deploy') {\n            steps {\n                script {\n                    sh \"docker service update civic_web --detach=true --image local.dtr/viseo/civic-app:latest\"\n                }\n            }\n        }\n\n    }\n}</pre>",frontmatter:{title:"Docker Enterprise Edition CI/CD",date:"March 07, 2018",path:"/docker-ee-jenkins-pipeline",tags:["jenkins","docker","continuous integration","continuous delivery"],excerpt:"Jenkins Pipeline CI/CD"}}},pathContext:{prev:null,next:null}}}});
//# sourceMappingURL=path---docker-ee-jenkins-pipeline-66bea4d45e4c1df63191.js.map