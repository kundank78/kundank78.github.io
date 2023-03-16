---
slug: cheeat-sheet-ckad
title: Cheat Sheet for CKAD
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
- `k cluster-info`
- `k get nodes`

### ReplicaSet
- `k get rs`
- `k scale --replicas=new_number rs replica_set_name`

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
- `*k create deploy deployment_name --image=image_name --replicas=no_of_pods*`
- `*k scale deploy deploy_name --replicas=no_of_pods*`
- `*k edit deploy deploy_name*`                                              ----> edit any field of deployment
- `*k set image deploy deploy_name container_name=nginx:1.9.1 --record*`     ----> changed image to different version with record flag capturing cmd used

- `*k rollout status deploy deploy_name*`
- `*k rollout history deploy deploy_name*`                                   ----> show revisions of deployment
- `*k rollout undo deploy deploy_name*`                                      ----> undo deployment to last revision
- `*k rollout history deploy deploy_name --revision=number*`                 ----> describe deployment of revision number
- `*k rollout undo deploy deploy_name --to-revision=number*`                 ----> rollback deployment to specific version

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

### Namespace
- `*k config set-context --current --namespace=namespace_name*`
- `*k port-forward svc/my-service 5000*`

```yml
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: dev
spec:
  hard:
    pods: "10"
    requests:
      cpu: "4"
      memory: "5Gi"
    limits:
      cpu: "10"
      memory: 10Gi
```

### Pods Configuration

##### Multi container pod: share same lifecycle & network
- Patterns: Side Car, Ambassador, Adapter

- POD Conditions
- PodScheduled -> Initialized -> ContainersReady -> Ready

- `*k logs -f pod_name container_name*`               # tail logs for container_name for multi container pod
- `*k replace -f pod.yaml --force*`                   # replace existing pod with new one
- `*k get pods -l key=value --no-headers | wc -l*`    # count of pod
- `*k get pod --show-labels*`
- `*k label po -l "app in(v1,v2)" tier=web*`

##### Taint Node
- `*k taint node node_name key=value:taint-effect*`  | Effects: NoSchedule, PreferNoSchedule, NoExecute
- `*k taint node node_name key=value:taint-effect-*` | Remove taint
- `*k label node node_name key=value*`

```yml
apiVersion: v1
kind: Pod
metadata:
  name: pod_name
  labels:
    key: value
  annotations:
    buildVersion: 1.34
  namespace: ns_name
spec:
  restartPolicy: Always                   # Always by default, Never & OnFailure
  serviceAccountName: service_acc_nm      # cannot be edited in pod but in deployment this can be edited and deployment will handle rollout for us
  automountServiceAccountToken: false     # doesn't mount default service account
  securityContext:                        # pod level security context, can be moved to container level
    runAsUser: 1000
  volumes:
    - name: pvc_volume
      persistentVolumeClaim:
        claimName: pvc_name
    - name: config_map_volume
      configMap:
        name: config_map_name
    - name: secret_volume                 # creates file for each key & value as secret
      secret:
        secretName: secret_name
    - name: empty_dir_vol                 # exists as long as pod on node disk, ram or network storage
      emptyDir:
        sizeLimit: 500Mi
    - name: host_volume
      hostPath:                           # mount file or directory from host node's filesystem
        type: Directory | DirectoryOrCreate
        path: /data
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:    # preferredDuringSchedulingIgnoredDuringExecution
        nodeSelectorTerms:
          - matchExpressions:
              - key: size
                operator: NotIn                          # In, NotIn, Exists, DoesNotExist, Gt and Lt.
                values:
                  - Small
  initContainers:
    - name: install
      image: image_name
  containers:
    - name: container_name
      image: image_name
      ports:
        - containerPort: port to expose
      command: ["sleep2.0"]               # overrides the entrypoint in docker
      args: ["10"]                        # adds as param in docker run cmd
      resources:                          # Scheduled on node if sum of requests of all container is less than node limit
        requests:
          cpu: "1"                        # "1" -> 1000m | 1m -> 1v cpu aws | If request not specified, it matches limit (same for memory)
          memory: "512Mi"
        limits:                           # container cannot exceeds its cpu limit    
          cpu: "2"                        # container can use more memory than limit but if it is continuous it will terminate | If limit not specified, 
          memory: "1Gi"                     it can use all of node's memory and finally get killed | If limit range is defined for namespace it uses it as default
      securityContext:
        capabilities:
          add: [ "MAC_ADMIN" ]
      volumeMounts:
        - mountPath: /opt                 # this will be in sync
          name: volume_name
      env:                                # adding env variables
        - name: APP_COLOR
          value: pink
        - name: APP_COLOR
          valueFrom:
            configMapKeyRef:
              name: config_map_name
              key: KEY1
        - name: APP_COLOR
          valueFrom:
            secretKeyRef:
              name: secret_name
              key: KEY1
      envFrom:
        - configMapRef:
            name: config_map_name
        - secretRef:
            name: secret_name
      tolerations:
        - key: "app"
          operator: "Equal"
          value: "blue"
          effect: "NoSchedule"
      nodeSelector:                         # label node with same
        key: value
      readinessProbe:
        periodSeconds: 5
        initialDelaySeconds: 15
        failureThreshold: 8
        httpGet:
          path: /api/ready
          port: 5000
        tcpSocket:
          port: 8080
        exec:
          command:
            - cat
            - /app/is_ready
      livenessProbe:
        periodSeconds: 5
        initialDelaySeconds: 15
        failureThreshold: 8
        httpGet:
          path: /api/ready
          port: 5000
        tcpSocket:
          port: 8080
        exec:
          command:
            - cat
            - /app/is_ready
```

### Config Map

- `*k create configmap config_map_name --from-literal=KEY1=VALUE1 --from-literal=KEY2=VALUE2*`
- `*k create configmap config_map_name --from-file=file_name.properties*`

```yml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: config_map_name
spec:
  key1: value1
  key2: value2
```

### Secrets
- `*echo -n 'encode' | base64*`
- `*echo -n 'decode' | base64 --decode*`
- `*k create secret secret_name --from-literal=KEY1=VALUE1 --from-literal=KEY2=VALUE2*`
- `*k create secret secret_name --from-file=file_name.properties*`

```yml
---
apiVersion: v1
kind: Secret
metadata:
  name: secret_name
spec:
  key1: value1
  key2: value2
```

### Jobs & CronJob
- `*k create job job_name --image=image_name -- command*`
- `*k create cronjob cron_name --image=image_name --schedule="* * * * *"*`

```yml
---
apiVersion: batch/v1
kind: Job
metadata:
  name: job_name
spec:
  completions: 3                            ----> no. of successful job completions | new pods are created until this number is reached
  parallelism: 3                            ----> creates pods in parallel
  template:
    spec:
      containers:
        - name: container_name
          image: image_name
          command:
            - cmd1
      restartPolicy: Never

---
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: cron-job-name
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      completions: 3
      parallelism: 3
      template:
        spec:
          containers:
            - name: container_name
              image: image_name
          restartPolicy: Never
```