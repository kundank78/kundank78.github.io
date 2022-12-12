"use strict";(self.webpackChunkkundan_dev=self.webpackChunkkundan_dev||[]).push([[477],{10:function(t){t.exports=JSON.parse('{"blogPosts":[{"id":"docusaurus-gh-action","metadata":{"permalink":"/blog/docusaurus-gh-action","source":"@site/blog/2021-01-17-docusaurus-gh-action.md","title":"GitHub Action for Docusaurus","description":"I got tired of deploying my Docusaurus website to GitHub Pages manually, and decided to do something about it using GitHub Action.","date":"2021-01-17T00:00:00.000Z","formattedDate":"January 17, 2021","tags":[{"label":"docusaurus","permalink":"/blog/tags/docusaurus"},{"label":"github-action","permalink":"/blog/tags/github-action"},{"label":"ci","permalink":"/blog/tags/ci"}],"readingTime":1.54,"hasTruncateMarker":true,"authors":[{"name":"Evan Tay","title":"Software Engineer at Padlet","url":"https://github.com/DigiPie","imageURL":"https://avatars2.githubusercontent.com/u/13582874"}],"frontMatter":{"slug":"docusaurus-gh-action","title":"GitHub Action for Docusaurus","author":"Evan Tay","author_url":"https://github.com/DigiPie","author_title":"Software Engineer at Padlet","author_image_url":"https://avatars2.githubusercontent.com/u/13582874","tags":["docusaurus","github-action","ci"]}},"content":"I got tired of deploying my Docusaurus website to GitHub Pages manually, and decided to do something about it using GitHub Action.\\n\\nInitially, I was planning to follow the [official guide](https://v2.docusaurus.io/docs/deployment#triggering-deployment-with-github-actions) on doing so. However, it was actually much more complicated than I liked. I did not really want to generate and store a SSH key on GitHub. Too much effort man.\\n\\nI decided it was better off for me to write my own script. Here it is:\\n\\n\x3c!--truncate--\x3e\\n\\n## deploy-docusaurus.yml\\n\\n:::caution\\n\\nThe script below assumes that your Docusaurus website resides at `/website` of your repo. If that is not the case for you, you will need to:\\n\\n- Change `cd website` to `cd <docu_site_root>`, or delete the entire line if your Docusaurus website is at the root of your repo `/`\\n- Change `build_dir`\'s value from `website/build` to `<docu_site_root>/build`, or `build` if your Docusaurus website is at the root of your repo `/`\\n\\n:::\\n\\n```yml\\nname: deploy-docusaurus\\n\\non:\\n  push:\\n    branches: [main]\\n  pull_request:\\n    branches: [main]\\n\\n  # Allows you to run this workflow manually from the Actions tab\\n  workflow_dispatch:\\n\\n# A workflow run is made up of one or more jobs that can run sequentially or in parallel\\njobs:\\n  publish:\\n    runs-on: ubuntu-latest\\n    steps:\\n      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it\\n      - name: Check out repo\\n        uses: actions/checkout@v2\\n      # Node is required for npm\\n      - name: Set up Node\\n        uses: actions/setup-node@v2\\n        with:\\n          node-version: \\"12\\"\\n      # Install and build Docusaurus website\\n      - name: Build Docusaurus website\\n        run: |\\n          cd website\\n          npm install \\n          npm run build\\n      - name: Deploy to GitHub Pages\\n        if: success()\\n        uses: crazy-max/ghaction-github-pages@v2\\n        with:\\n          target_branch: gh-pages\\n          build_dir: website/build\\n        env:\\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\\n```\\n\\n:::note\\n\\nGitHub will automatically add `GITHUB_TOKEN` to Secrets. You need not do so. See [this](https://docs.github.com/en/actions/reference/authentication-in-a-workflow) for more information.\\n\\n:::\\n\\nTo see this script in action, visit my [personal website repo](https://github.com/DigiPie/kaya-folio/actions)."}]}')}}]);