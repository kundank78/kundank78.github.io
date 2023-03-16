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
- `k create deploy deployment_name --image=image_name --replicas=no_of_pods`
- `k scale deploy deploy_name --replicas=no_of_pods`
- `k edit deploy deploy_name`                                              ----> edit any field of deployment
- `k set image deploy deploy_name container_name=nginx:1.9.1 --record`     ----> changed image to different version with record flag capturing cmd used

- `k rollout status deploy deploy_name`
- `k rollout history deploy deploy_name`                                   ----> show revisions of deployment
- `k rollout undo deploy deploy_name`                                      ----> undo deployment to last revision
- `k rollout history deploy deploy_name --revision=number`                 ----> describe deployment of revision number
- `k rollout undo deploy deploy_name --to-revision=number`                 ----> rollback deployment to specific version

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
- `k config set-context --current --namespace=namespace_name`
- `k port-forward svc/my-service 5000`

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

- `k logs -f pod_name container_name`               # tail logs for container_name for multi container pod
- `k replace -f pod.yaml --force`                   # replace existing pod with new one
- `k get pods -l key=value --no-headers | wc -l`    # count of pod
- `k get pod --show-labels`
- `k label po -l "app in(v1,v2)" tier=web`

##### Taint Node
- `k taint node node_name key=value:taint-effect`  | Effects: NoSchedule, PreferNoSchedule, NoExecute
- `k taint node node_name key=value:taint-effect-` | Remove taint
- `k label node node_name key=value`

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

- `k create configmap config_map_name --from-literal=KEY1=VALUE1 --from-literal=KEY2=VALUE2`
- `k create configmap config_map_name --from-file=file_name.properties`

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
- `echo -n 'encode' | base64`
- `echo -n 'decode' | base64 --decode`
- `k create secret secret_name --from-literal=KEY1=VALUE1 --from-literal=KEY2=VALUE2`
- `k create secret secret_name --from-file=file_name.properties`

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
### Service Accounts
```
when service account is created a token is generated as secret | This used happen before kube 1.24, after
1.24 you can create token using `k create token service_account_name` this prints token with expiry time
Token can be passed as a bearer token while calling kube apis
Each namespace has its own service account
Pod when created is mounted with volume having token created via token request api(has expiry)
```
``` 
 k create sa service_account_name
 k create token <sa_name>
``` 
Manually create long-lived token for service account
Annotate secret with kubernetes.io/service-account.name: <sa_name> and controller will auto-inject token inside the secret



### Jobs & CronJob
- `k create job job_name --image=image_name -- command`
- `k create cronjob cron_name --image=image_name --schedule="* * * * *"`

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


### Service
```yml
---
apiVersion: v1
kind: Service
metadata:
  name: service_name
spec:
  type: NodePort
  ports:
    - targetPort: 80                                   # container's port
      port: 80                                         # service port
      nodePort: 30008
  selector:
      key: value
      key1: value1
```

##### Load Balancing through services is done in random fashion
##### ClusterIP : creates a virtual ip
##### LoadBalancer
##### NodePort (Range: 30000 - 32767): Exposes node port for every node if pods are distributed

- `k expose pod pod_name --port=port_number --name=svc_name`        ----> create cluster ip service with pod's label as selectors
- `k create svc clusterip svc_name --tcp=?:?`                       ----> create cluster ip service with selector's as app=svc_name

- `k expose pod pod_name --port=80 --type=NodePort`                 ----> create node port service with pod's label as selectors
- `k create svc nodeport svc_name --tcp=?:? --node-port=node_port`  ----> create nodeport svc with defined node port but doesn't use pod's labels as selectors


### Ingress

```yml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress_name
spec:
  rules:
    - host: host_name
      http:
        paths:
          - path: /path1
            pathType: Prefix
            backend:
              service:
                name: svc_name
                port:
                  number: port_number
          - path: /path2
            pathType: Prefix
            backend:
              service:
                name: svc_name2
                port:
                  number: port_number2
```

- `kubectl create ingress <ingress-name> --rule="host/path=service:port"`
- `kubectl create ingress ingress-test --rule="wear.my-online-store.com/wear*=wear-service:80"`

### Network Policy

```yml
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: name
  namespace: pod_namespace
spec:
  podSelector:
    matchLabels:
      key: value
  policyTypes:                           # If only policyTypes is present it blocks all Ingress & Egress traffic
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              key: other-pod
          namespaceSelector:             # If only namespace selector defined all pods under given ns will be able to access
            matchLabels:
              name: other_ns_name
        - ipBlock:
            cidr: 192.168.5.10/32
      ports:
        - protocol: TCP
          port: 3306                     # incoming traffic on port
  egress:
    to:
      - ipBlock:
          cidr: 192.168.5.10/32
    ports:
      - protocol: TCP
        port: 80                         # port on server ip
```

### Volumes

```yml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv_name
spec:
  accessModes:
    - ReadWriteOnce
    - ReadOnlyMany
    - ReadWriteMany
  capacity:
    storage: 1Gi
  persistentVolumeReclaimPolicy: Recycle | Retain | Delete
  awsElasticBlockStore:
    volumeID: volume_id
    fsType: ext4
  hostPath:
    path: "/mnt/data"

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc_name
spec:
  storageClassName: manual | normal
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi

```

### Kube API Server & API Groups

##### Edit the kube-apiserver static pod configured by kubeadm to pass in the user details.
##### The file is located at /etc/kubernetes/manifests/kube-apiserver.yaml

- `k config use-context context_name`
- `k config view`
- `k config set-context --current --namespace=name`


### API Groups
- `k proxy`     ---> exposes kube api on local
- `k api-resources --namespaced=true `
- Actions- list, get, create, update, delete, watch

```yml
---
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
    - command:
        - kube-apiserver
        - --authorization-mode=Node,RBAC
          <content-hidden>
        - --basic-auth-file=/tmp/users/user-details.csv
      image: k8s.gcr.io/kube-apiserver-amd64:v1.11.3
      name: kube-apiserver
      volumeMounts:
        - mountPath: /tmp/users
          name: usr-details
          readOnly: true
  volumes:
    - hostPath:
        path: /tmp/users
        type: DirectoryOrCreate
      name: usr-details
```

### Roles
- `k create role role_name --verb=get,ist --resources=pods,pods/status --resource-name`
- `k create rolebinding role_binding_name --clusterrole=cluster_role_name --user=user_name --namespace=ns_name`
- `k auth can-i <cmd> -as user`

```yml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: default
  name: pod-reader
rules:
  - apiGroups: [""] # "" indicates the core API group
    resources: ["pods", "pods/log"]
    verbs: ["get", "watch", "list"] | # ["*"] --> everything

---
# This role binding allows "user1" to read pods in the "default" namespace.
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: read-pods
  namespace: default
subjects:
  - kind: User
    name: user1 # Name is case-sensitive
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role #this must be Role or ClusterRole
  name: pod-reader # this must match the name of the Role or ClusterRole you wish to bind to
  apiGroup: rbac.authorization.k8s.io
```


### API Versions

##### vXalphaY --> vXbetaY --> vX

##### Alpha -> Not enabled by default
##### Beta -> Enabled by default
##### GA(Stable) -> Enabled by default

##### Preferred version -> version k8s will use while retrieving info
##### Storage Version -> version objects will converted to while storing in etcd cluster

### API Deprecations
1. Api elements can be removed only by incrementing API version of group
2. Api objects must be able to round trip between API versions in a given release without information loss
   with exception of whole REST resources which don't exist in some version
3. Other than the most recent API version in each track, older API version must be supported after their announced
   deprecation for a duration of no less than-
   a. GA (stable)- 12 months or 3 releases (whichever is longer)
   b. Beta - 9 months or 3 releases (whichever is longer)
   c. Alpha - 0 releases
   In Kubernetes versions -> X.Y.Z
   Where X stands for major, Y stands for minor and Z stands for patch version.
- `k convert -f <old_file> --output-version group/version`
- Add --runtime-config=<api-group>/<version>  --> enable new version


### Helm
```
helm repo add [repository-name] [url]
helm repo remove [repository-name]
helm repo update
helm list
helm search hub package_name
helm search repo package_name
helm show chart repo/package
helm show values repo/package

helm get manifest release_name
helm install release_name chart_name
helm status release_name
helm upgrade release_name repo/package
helm history release_name
helm rollback release_name version
helm uninstall release-name
helm pull --untar repo/chart_name
```