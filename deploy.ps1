# Experiment 9 Deployment Script (AWS)
# This script automates the discovery of VPC/Subnets and runs the CloudFormation command.

Write-Host "Starting Experiment 9 Automated Deployment..."

# 1. Path to AWS CLI
$awsPath = "C:\Users\krisn\aws-cli\Amazon\AWSCLIV2\aws.exe"

# 2. Get Default VPC and Subnets
Write-Host "Discovering network infrastructure..."
try {
    $vpcId = (& $awsPath ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text)
    if ($vpcId -eq "None" -or !$vpcId) {
        $vpcId = (& $awsPath ec2 describe-vpcs --query "Vpcs[0].VpcId" --output text)
    }
    
    $subnets = (& $awsPath ec2 describe-subnets --filters "Name=vpc-id,Values=$vpcId" --query "Subnets[*].SubnetId" --output text)
    $subnetList = $subnets -replace "\s+", ","

    Write-Host "Target VPC: $vpcId"
    Write-Host "Target Subnets: $subnetList"
} catch {
    Write-Host "Error discovering AWS resources. Are you logged in? (Try running the configure command first)"
    exit 1
}

# 3. Deploy CloudFormation Stack
Write-Host "Deploying CloudFormation Stack (Exp9FullStack)..."
& $awsPath cloudformation deploy `
    --stack-name Exp9FullStack `
    --template-file ./aws/infrastructure.yaml `
    --parameter-overrides VpcId=$vpcId Subnets=$subnetList `
    --capabilities CAPABILITY_IAM

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment Started! Fetching Instance URL..."
    $url = (& $awsPath cloudformation describe-stacks --stack-name Exp9FullStack --query "Stacks[0].Outputs[?OutputKey=='AppURL'].OutputValue" --output text)
    Write-Host "Your App will be available at: $url"
} else {
    Write-Host "Deployment failed. Check the AWS CloudFormation Console for details."
}
