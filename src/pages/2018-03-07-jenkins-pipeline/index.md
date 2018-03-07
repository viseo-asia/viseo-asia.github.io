---
path: "/jenkins-pipeline"
date: "2018-03-07"
title: "Jenkins Pipeline"
tags: ["jenkins", "pipeline", "CI", "CD"]
excerpt: "Jenkins Pipeline CI/CD"
---

## Jenkins Pipelines

Easy CI/CD with Jenkins Pipelines.

<pre class="prettyprint">class Voila {
public:
  // Voila
  static const string VOILA = "Voila";

  // will not interfere with embedded <a href="#voila2">tags</a>.
}</pre>

<pre class="prettyprint">[2015-11-30 07:43:46,075][INFO ][node                     ] [Water Wizard] version[2.1.0], pid[1], build[72cd1f1/2015-11-18T22:40:03Z]
[2015-11-30 07:43:46,075][INFO ][node                     ] [Water Wizard] initializing ...
[2015-11-30 07:43:46,209][INFO ][plugins                  ] [Water Wizard] loaded [], sites []
[2015-11-30 07:43:46,296][INFO ][env                      ] [Water Wizard] using [1] data paths, mounts [[/usr/share/elasticsearch/data (/dev/disk/by-uuid/307721ef-5d43-483d-916c-8d84ea413439)]], net usable_space [16.7gb], net total_space [39.3gb], spins? [possibly], types [ext4]
[2015-11-30 07:43:50,919][INFO ][node                     ] [Water Wizard] initialized
[2015-11-30 07:43:50,948][INFO ][node                     ] [Water Wizard] starting ...
[2015-11-30 07:43:51,277][WARN ][common.network           ] [Water Wizard] publish address: {0.0.0.0} is a wildcard address, falling back to first non-loopback: {172.17.0.23}
[2015-11-30 07:43:51,278][INFO ][transport                ] [Water Wizard] publish_address {172.17.0.23:9300}, bound_addresses {[::]:9300}
[2015-11-30 07:43:51,336][INFO ][discovery                ] [Water Wizard] elasticsearch/IfHSxUEDRb-h4vxP3g_FVA
[2015-11-30 07:43:54,466][INFO ][cluster.service          ] [Water Wizard] new_master {Water Wizard}{IfHSxUEDRb-h4vxP3g_FVA}{172.17.0.23}{172.17.0.23:9300}, reason: zen-disco-join(elected_as_master, [0] joins received)
[2015-11-30 07:43:46,075][INFO ][node                     ] [Water Wizard] version[2.1.0], pid[1], build[72cd1f1/2015-11-18T22:40:03Z]
[2015-11-30 07:43:46,075][INFO ][node                     ] [Water Wizard] initializing ...
[2015-11-30 07:43:46,209][INFO ][plugins                  ] [Water Wizard] loaded [], sites []
[2015-11-30 07:43:46,296][INFO ][env                      ] [Water Wizard] using [1] data paths, mounts [[/usr/share/elasticsearch/data (/dev/disk/by-uuid/307721ef-5d43-483d-916c-8d84ea413439)]], net usable_space [16.7gb], net total_space [39.3gb], spins? [possibly], types [ext4]
[2015-11-30 07:43:50,919][INFO ][node                     ] [Water Wizard] initialized
[2015-11-30 07:43:50,948][INFO ][node                     ] [Water Wizard] starting ...
[2015-11-30 07:43:51,277][WARN ][common.network           ] [Water Wizard] publish address: {0.0.0.0} is a wildcard address, falling back to first non-loopback: {172.17.0.23}
[2015-11-30 07:43:51,278][INFO ][transport                ] [Water Wizard] publish_address {172.17.0.23:9300}, bound_addresses {[::]:9300}
[2015-11-30 07:43:51,336][INFO ][discovery                ] [Water Wizard] elasticsearch/IfHSxUEDRb-h4vxP3g_FVA
[2015-11-30 07:43:54,466][INFO ][cluster.service          ] [Water Wizard] new_master {Water Wizard}{IfHSxUEDRb-h4vxP3g_FVA}{172.17.0.23}{172.17.0.23:9300}, reason: zen-disco-join(elected_as_master, [0] joins received)
[2015-11-30 07:43:54,593][WARN ][common.network           ] [Water Wizard] publish address: {0.0.0.0} is a wildcard address, falling back to first non-loopback: {172.17.0.23}
[2015-11-30 07:43:54,594][INFO ][http                     ] [Water Wizard] publish_address {172.17.0.23:9200}, bound_addresses {[::]:9200}
[2015-11-30 07:43:54,597][INFO ][node                     ] [Water Wizard] started
[2015-11-30 07:43:54,651][INFO ][gateway                  ] [Water Wizard] recovered [0] indices into cluster_state
</pre>

<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>