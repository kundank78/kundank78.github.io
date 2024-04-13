const math = require("remark-math");
const katex = require("rehype-katex");

const internetProfiles = {
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kundan-kumar-77a613a9/",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/kundank78",
  },
  email: {
    label: "Email",
    href: "mailto:kkundan.iitr@gmail.com",
  },
  blog: {
    label: "Blog",
    to: "blog",
  },
  projects: {
    label: "Projects",
    to: "projects",
  },
  resume: {
    label: "Resume",
    href: "https://www.linkedin.com/in/kundan-kumar-77a613a9/overlay/1635493534947/single-media-viewer/",
  },
};

module.exports = {
  title: "Kundan Kumar",
  tagline:
    "I am a Software Engineer and Cloud Engineer passionate about solving meaningful problem.",
  url: "https://kundank78.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/logo.png",
  organizationName: "kundank78",
  projectName: "kundank78.github.io",
  deploymentBranch: "gh-pages",
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: "Kundan Kumar",
      logo: {
        alt: "Kundan Kumar",
        src: "img/logo.png",
        target: "_self",
      },
      items: [
        { to: "blog/", label: "Blog", position: "left" },
        { to: "docs/", label: "Snippets", position: "left", activeBasePath: "docs" },
        { to: "projects/", label: "Projects", position: "left" },
        {
          href: "https://kundank78.github.io/pdf/resume.pdf",
          label: "Resume",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Connect",
          items: [
            internetProfiles.linkedin,
            internetProfiles.github,
            internetProfiles.email,
          ],
        },
        {
          title: "Discover",
          items: [
            internetProfiles.blog,
            internetProfiles.projects,
            internetProfiles.resume,
          ],
        },
      ],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          disableVersioning: false,
          editCurrentVersion: false,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
        //  editUrl: "https://github.com/kundank78/kaya-folio/tree/main/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: 'G-L77M1EX8JW',
          anonymizeIP: true,
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    },
  ],
  plugins:    [
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};
