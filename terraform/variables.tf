variable "aws_region" {
  type        = string
  description = "The AWS Region to deploy all resources into"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Prefix for all resources created by this Terraform module"
  default     = "cloud-project"
}

variable "mongodb_uri" {
  type        = string
  description = "The connection string for MongoDB Atlas database"
  sensitive   = true
}
