output "backend_alb_dns_name" {
  value       = aws_lb.backend_alb.dns_name
  description = "The public DNS name of the Application Load Balancer for the backend API"
}

output "frontend_cloudfront_url" {
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
  description = "The public HTTPS URL of your CloudFront frontend distribution"
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.frontend.id
  description = "The S3 bucket name where frontend static files are hosted"
}

output "ecr_repository_url" {
  value       = aws_ecr_repository.backend.repository_url
  description = "The URL of the ECR repository for the backend Docker image"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.cdn.id
  description = "The ID of the CloudFront distribution"
}
