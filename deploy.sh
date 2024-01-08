#!/bin/bash

# 색상 출력 함수 정의
print_colored() {
  local COLOR=$1
  local MSG=$2
  printf "\e[${COLOR}m${MSG}\e[0m\n"
}

# 색상 코드
YELLOW="33"

# 스크립트 실행
print_colored $YELLOW "Starting deployment..."

# .env.local 파일에서 환경변수 가져오기
print_colored $YELLOW "Loaded the environment variables."
if [ -f .env.local ]; then
  export $(cat .env.local | xargs)
fi

# 프로젝트 빌드 및 내보내기
print_colored $YELLOW "Built the project."
npm run build

# AWS S3에 동기화
print_colored $YELLOW "Synchronized the AWS directory with S3."
aws s3 sync ./build s3://$S3_BUCKET_NAME --profile=$IAM_USER

# CloudFront 캐시 무효화
print_colored $YELLOW "Invalidated the CloudFront cache."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*" --no-cli-pager --profile $IAM_USER

print_colored $YELLOW "Finished deployment."