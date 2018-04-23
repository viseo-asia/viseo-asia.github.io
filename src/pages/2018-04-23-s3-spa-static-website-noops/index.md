---
path: "/aws-s3-spa-static-website-noops"
date: "2018-04-23"
title: "AWS S3 Single Page App Static Website NoOps"
tags: ["aws", "s3", "single page app", "static website", "noops"]
excerpt: "AWS S3 SPA Static Website NoOps Pipeline"
---

## Overview

AWS S3 SPA Static Website NoOps Pipeline


aws --profile rudi-viseo --region ap-southeast-1 s3 mb s3://viseo-hk-103
aws --profile rudi-viseo --region ap-southeast-1 s3 website s3://viseo-hk-103/ --index-document index.html --error-document index.html
aws --profile rudi-viseo --region ap-southeast-1 s3api put-bucket-policy --bucket viseo-hk-103 --policy file://policy.json

{
  "Id": "Policy1524479853035",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1524479850470",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::viseo-hk-103/*",
      "Principal": "*"
    }
  ]
}

aws --profile rudi-viseo --region ap-southeast-1 s3 sync build/  s3://viseo-hk-103