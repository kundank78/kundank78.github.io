---
slug: docusaurus-gh-action
title: GitHub Action for Docusaurus
author: Kundan Kumar
author_url: https://github.com/kundank78
author_title: Software Engineer at JP Morgan
author_image_url: https://avatars.githubusercontent.com/u/25195457
tags: [go, bittorrent]
---

I got my CKAD certification in Dec, 2022 and I faced difficulty memorizing all the k8s object yamls & imperative commands. Cracking CKAD needs crystal k8s concepts along with bit of a practice K8s commands. Sharing below notes taken during my preparation.

<!--truncate-->

### Setting Alias ..... A Must
```
alias k=kubectl

export do="--dry-run=client -o yaml" 
k create deploy nginx --image=nginx $do

export now="--force --grace-period 0"
k delete pod pod_name $now

```

### K8s Cluster & Namespace Commands
- k cluster-info
- k get nodes
- k config set-context --current --namespace=namespace_name
- k port-forward svc/my-service 5000

### ReplicaSet
- k get rs
- k scale --replicas=new_number rs replica_set_name

```yml
---
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: replica_set_name
  labels:
    key: value
spec:
  replicas: no_of_pods
  selector:  #used to identify existing pods in env
    matchLabels:
      key: value
  template:
    metadata:
      name: pod_name
      labels:
        key: value
    spec:
      containers:
        - name: container_name
          image: image_name
```

### Deployment
- k create deploy deployment_name --image=image_name --replicas=no_of_pods
- k scale deploy deploy_name --replicas=no_of_pods
- k edit deploy deploy_name                                              ----> edit any field of deployment
- k set image deploy deploy_name container_name=nginx:1.9.1 --record     ----> changed image to different version with record flag capturing cmd used

- k rollout status deploy deploy_name
- k rollout history deploy deploy_name                                   ----> show revisions of deployment
- k rollout undo deploy deploy_name                                      ----> undo deployment to last revision
- k rollout history deploy deploy_name --revision=number                 ----> describe deployment of revision number
- k rollout undo deploy deploy_name --to-revision=number                 ----> rollback deployment to specific version

```yml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment_name
  labels:
    key: value
spec:
  replicas: no_of_pods
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  selectors:
    matchLabels:
      key: value
  template:
    metadata:
      name: pod_name
      labels:
        key: value
    spec:
      containers:
        - name: container_name
          image: image_name
          ports:
            - containerPort: 8080
```