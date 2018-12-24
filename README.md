# Serverless CORS Proxy
Basic node serverless CORS proxy. Deploy a generic proxy service to AWS in minutes.

# Prerequisites
- [Node](https://nodejs.org/en/) 8.10+
- [Serverless Framework](https://serverless.com/) 1.27.3+
```
npm install -g serverless
```
- [AWS CLI](https://aws.amazon.com/cli/) 1.15.4+
```
brew install awscli
```

# Getting Started
1) Clone the serverless-cors-proxy repository:
```
git clone https://github.com/jjdii/serverless-cors-proxy.git
cd serverless-cors-proxy
```

2) Create a new user in AWS IAM with `AdministratorAccess`. Save the access keys provided.

3) Create a new API in the AWS API Gateway.

4) Run the setup script. It will ask for your AWS access keys.
```
./sls setup
```

5) Create a new serverless.env.yml file:
```
# IAM > Roles
AWS_ROLE: arn:aws:iam::[AWS_IAM_ID]:role/[ROLE_NAME]

# API Gateway > YOUR_API_NAME > Resources
AWS_API_ID_DEV: [XXXXXXXXXX]
AWS_API_ROOT_ID_DEV: [XXXXXXXXXX]
```
Example serverless.env.yml file:
```
AWS_ROLE: arn:aws:iam::103938583682:role/aws_lambda_executor

AWS_API_ID_DEV: wa9dh38h9r
AWS_API_ROOT_ID_DEV: d73207gr7d
```
Separate `AWS_API_ID` & `AWS_API_ROOT_ID` entries must be made for every stage you wish to deploy to:
```
AWS_API_ID_DEV: wa9dh38h9r
AWS_API_ROOT_ID_DEV: d73207gr7d

AWS_API_ID_STAGING: 17tr923tr7
AWS_API_ROOT_ID_STAGING: dw20h3u38u

AWS_API_ID_PROD: k8d00ri42d
AWS_API_ROOT_ID_PROD: m26b5nsklk

...
```

6) Run the deploy script:
```
./sls deploy all dev
```

# Scripts Reference
```
./sls setup
```
```
./sls deploy all [STAGE(optional)]
./sls deploy [ENDPOINT_NAME] [STAGE(optional)]
```
```
./sls remove all [STAGE(optional)]
./sls remove [ENDPOINT_NAME] [STAGE(optional)]
```
```
./sls npm install all
./sls npm install [ENDPOINT_NAME]
```
```
./sls npm addto all [NPM_PACKAGE]
./sls npm addto [ENDPOINT_NAME] [NPM_PACKAGE]
```