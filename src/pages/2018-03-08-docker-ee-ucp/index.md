---
path: "/docker-ee-ucp"
date: "2018-03-08"
title: "Docker EE UCP"
tags: ["docker", "ucp", "CI", "CD"]
excerpt: "Docker EE UCP"
---

## Docker UCP 

Docker EE UCP HTTP Routing Mesh

<pre class="prettyprint">version: "3.1"

services:

  web:
    deploy:
      labels:
        - com.docker.ucp.mesh.http=external_route=http://civic.local,internal_port=3000
</pre>
