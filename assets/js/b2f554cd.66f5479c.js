"use strict";(self.webpackChunkkundan_dev=self.webpackChunkkundan_dev||[]).push([[477],{10:function(e){e.exports=JSON.parse('{"blogPosts":[{"id":"cheeat-sheet-ckad","metadata":{"permalink":"/blog/cheeat-sheet-ckad","source":"@site/blog/2023-03-16-bittorrent-go.md","title":"Cheat Sheet for CKAD","description":"I got my CKAD certification in Dec, 2022 and I faced difficulty memorizing all the k8s object yamls & imperative commands. Cracking CKAD needs crystal k8s concepts along with bit of a practice K8s commands. Sharing below notes taken during my preparation.","date":"2023-03-16T00:00:00.000Z","formattedDate":"March 16, 2023","tags":[{"label":"go","permalink":"/blog/tags/go"},{"label":"bittorrent","permalink":"/blog/tags/bittorrent"}],"readingTime":1.48,"hasTruncateMarker":true,"authors":[{"name":"Kundan Kumar","title":"Software Engineer at JP Morgan","url":"https://github.com/kundank78","imageURL":"https://avatars.githubusercontent.com/u/25195457"}],"frontMatter":{"slug":"cheeat-sheet-ckad","title":"Cheat Sheet for CKAD","author":"Kundan Kumar","author_url":"https://github.com/kundank78","author_title":"Software Engineer at JP Morgan","author_image_url":"https://avatars.githubusercontent.com/u/25195457","tags":["go","bittorrent"]},"nextItem":{"title":"GitHub Action for Docusaurus","permalink":"/blog/docusaurus-gh-action"}},"content":"I got my CKAD certification in Dec, 2022 and I faced difficulty memorizing all the k8s object yamls & imperative commands. Cracking CKAD needs crystal k8s concepts along with bit of a practice K8s commands. Sharing below notes taken during my preparation.\\n\\n\x3c!--truncate--\x3e\\n\\n### Setting Alias ..... A Must\\n```\\nalias k=kubectl\\n\\nexport do=\\"--dry-run=client -o yaml\\" \\nk create deploy nginx --image=nginx $do\\n\\nexport now=\\"--force --grace-period 0\\"\\nk delete pod pod_name $now\\n\\n```\\n\\n### K8s Cluster & Namespace Commands\\n- k cluster-info\\n- k get nodes\\n- k config set-context --current --namespace=namespace_name\\n- k port-forward svc/my-service 5000\\n\\n### ReplicaSet\\n- k get rs\\n- k scale --replicas=new_number rs replica_set_name\\n\\n```yml\\n---\\napiVersion: apps/v1\\nkind: ReplicaSet\\nmetadata:\\n  name: replica_set_name\\n  labels:\\n    key: value\\nspec:\\n  replicas: no_of_pods\\n  selector:  #used to identify existing pods in env\\n    matchLabels:\\n      key: value\\n  template:\\n    metadata:\\n      name: pod_name\\n      labels:\\n        key: value\\n    spec:\\n      containers:\\n        - name: container_name\\n          image: image_name\\n```\\n\\n### Deployment\\n- k create deploy deployment_name --image=image_name --replicas=no_of_pods\\n- k scale deploy deploy_name --replicas=no_of_pods\\n- k edit deploy deploy_name                                              ----\x3e edit any field of deployment\\n- k set image deploy deploy_name container_name=nginx:1.9.1 --record     ----\x3e changed image to different version with record flag capturing cmd used\\n\\n- k rollout status deploy deploy_name\\n- k rollout history deploy deploy_name                                   ----\x3e show revisions of deployment\\n- k rollout undo deploy deploy_name                                      ----\x3e undo deployment to last revision\\n- k rollout history deploy deploy_name --revision=number                 ----\x3e describe deployment of revision number\\n- k rollout undo deploy deploy_name --to-revision=number                 ----\x3e rollback deployment to specific version\\n\\n```yml\\n---\\napiVersion: apps/v1\\nkind: Deployment\\nmetadata:\\n  name: deployment_name\\n  labels:\\n    key: value\\nspec:\\n  replicas: no_of_pods\\n  strategy:\\n    rollingUpdate:\\n      maxSurge: 25%\\n      maxUnavailable: 25%\\n    type: RollingUpdate\\n  selectors:\\n    matchLabels:\\n      key: value\\n  template:\\n    metadata:\\n      name: pod_name\\n      labels:\\n        key: value\\n    spec:\\n      containers:\\n        - name: container_name\\n          image: image_name\\n          ports:\\n            - containerPort: 8080\\n```"},{"id":"docusaurus-gh-action","metadata":{"permalink":"/blog/docusaurus-gh-action","source":"@site/blog/2021-01-17-docusaurus-gh-action.md","title":"GitHub Action for Docusaurus","description":"I got tired of deploying my Docusaurus website to GitHub Pages manually, and decided to do something about it using GitHub Action.","date":"2021-01-17T00:00:00.000Z","formattedDate":"January 17, 2021","tags":[{"label":"docusaurus","permalink":"/blog/tags/docusaurus"},{"label":"github-action","permalink":"/blog/tags/github-action"},{"label":"ci","permalink":"/blog/tags/ci"}],"readingTime":1.485,"hasTruncateMarker":true,"authors":[{"name":"Kundan Kumar","title":"Software Engineer at JP Morgan","url":"https://github.com/kundank78","imageURL":"https://avatars.githubusercontent.com/u/25195457"}],"frontMatter":{"slug":"docusaurus-gh-action","title":"GitHub Action for Docusaurus","author":"Kundan Kumar","author_url":"https://github.com/kundank78","author_title":"Software Engineer at JP Morgan","author_image_url":"https://avatars.githubusercontent.com/u/25195457","tags":["docusaurus","github-action","ci"]},"prevItem":{"title":"Cheat Sheet for CKAD","permalink":"/blog/cheeat-sheet-ckad"}},"content":"I got tired of deploying my Docusaurus website to GitHub Pages manually, and decided to do something about it using GitHub Action.\\n\\nInitially, I was planning to follow the [official guide](https://v2.docusaurus.io/docs/deployment#triggering-deployment-with-github-actions) on doing so. However, it was actually much more complicated than I liked. I did not really want to generate and store a SSH key on GitHub. Too much effort man.\\n\\nI decided it was better off for me to write my own script. Here it is:\\n\\n\x3c!--truncate--\x3e\\n\\n## deploy-docusaurus.yml\\n\\n:::caution\\n\\nThe script below assumes that your Docusaurus website resides at `/website` of your repo. If that is not the case for you, you will need to:\\n\\n- Change `cd website` to `cd <docu_site_root>`, or delete the entire line if your Docusaurus website is at the root of your repo `/`\\n- Change `build_dir`\'s value from `website/build` to `<docu_site_root>/build`, or `build` if your Docusaurus website is at the root of your repo `/`\\n\\n:::\\n\\n```yml\\nname: deploy-docusaurus\\n\\non:\\n  push:\\n    branches: [main]\\n  pull_request:\\n    branches: [main]\\n\\n  # Allows you to run this workflow manually from the Actions tab\\n  workflow_dispatch:\\n\\n# A workflow run is made up of one or more jobs that can run sequentially or in parallel\\njobs:\\n  publish:\\n    runs-on: ubuntu-latest\\n    steps:\\n      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it\\n      - name: Check out repo\\n        uses: actions/checkout@v2\\n      # Node is required for npm\\n      - name: Set up Node\\n        uses: actions/setup-node@v2\\n        with:\\n          node-version: \\"12\\"\\n      # Install and build Docusaurus website\\n      - name: Build Docusaurus website\\n        run: |\\n          cd website\\n          npm install \\n          npm run build\\n      - name: Deploy to GitHub Pages\\n        if: success()\\n        uses: crazy-max/ghaction-github-pages@v2\\n        with:\\n          target_branch: gh-pages\\n          build_dir: website/build\\n        env:\\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\\n```\\n\\n:::note\\n\\nGitHub will automatically add `GITHUB_TOKEN` to Secrets. You need not do so. See [this](https://docs.github.com/en/actions/reference/authentication-in-a-workflow) for more information.\\n\\n:::"}]}')}}]);