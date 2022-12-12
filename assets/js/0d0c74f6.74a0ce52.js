"use strict";(self.webpackChunkkundan_dev=self.webpackChunkkundan_dev||[]).push([[421],{9756:function(e,t,a){a.r(t),a.d(t,{default:function(){return v}});var n=a(7294),r=a(6550),l=a(6010),i=a(9960),o=a(4996),c=a(2263),s=a(3285),m=a(7814),d=a(1436),u=a(3024),g="projectPageHeader_YTeS",p="projectItem___un",h="directory_sHAu",E=[{category:"Project",title:"image-colorization-using-gans",slug:"#image-colorization-using-gans",imageUrl:"img/projects/Colorization_gan.png",subtitle:"Gray-scale Image Colorization using Conditional Generative Adversarial Network.",period:"May 2018",tech:"PyTorch, Adversarial Network",description:n.createElement(n.Fragment,null,n.createElement("p",null,"Gray-scale Image Colorization using Conditional Generative Adversarial Network. This is a PyTorch implementation of the DCGAN as described in the paper Image Colorization using Generative Adversarial Networks"),n.createElement("h4",null,"Method"),n.createElement("p",null,"In a traditional GAN, the input of the generator is randomly generated noise data z. However, this approach is not applicable to the automatic colorization problem due to the nature of its inputs. The generator must be modified to accept grayscale images as inputs rather than noise. This problem was addressed by using a variant of GAN called conditional generative adversarial networks. Since no noise is introduced, the input of the generator is treated as zero noise with the grayscale input as a prior:",n.createElement("br",null),n.createElement("br",null),n.createElement("img",{src:"https://github.com/kundank78/Colorization_GAN/raw/master/img/con_gan.png"}),n.createElement("br",null),n.createElement("br",null)),n.createElement("h4",null," Network Architecture "),n.createElement("p",null,"The architecture of generator is inspired by U-Net:",n.createElement("br",null),n.createElement("br",null),n.createElement("img",{src:"https://github.com/kundank78/Colorization_GAN/raw/master/img/unet.png"}),n.createElement("br",null),n.createElement("br",null),"The architecture of the model is symmetric, with n encoding units and n decoding units. For discriminator, we use similar architecture as the baselines contractile path."),n.createElement("h4",null," Datasets "),n.createElement("p",null,"We used CIFAR-10 dataset to train model. Download dataset ",n.createElement("a",{href:"https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz"},"here"),".")),links:[{name:"GitHub repository",link:"https://github.com/kundank78/Colorization_GAN"},{name:"Image Colorization using GANs Paper",link:"https://arxiv.org/pdf/1803.05400.pdf"},{name:"A TensorFlow Implementation of Image Colorization",link:"https://github.com/ImagingLab/Colorizing-with-GANs"}]}];function b(e){var t,a=e.category,r=e.size,l=void 0===r?"1x":r;switch(a){case"Project":default:t=d.gMD;break;case"Open Source Tool":t=d.CgH;break;case"Website":t=u.bRs;break;case"Game":t=d.l9D}return n.createElement(m.G,{alt:a,size:l,icon:t})}var v=function(){var e=(0,c.Z)().siteConfig,t=void 0===e?{}:e,a=(0,n.useRef)(null),u=(0,n.useState)(!1),v=u[0],f=u[1],k=(0,n.useState)(E[0]),N=k[0],y=k[1],w=(0,r.TH)();return(0,n.useEffect)((function(){!function(){if(w.hash){var e=E.find((function(e){return e.slug==w.hash}));if(e)return y(e),f(!0),void window.scrollTo(0,0)}f(!1)}(),a.current.hidden=!1})),n.createElement(s.Z,{title:"Projects",description:t.tagline},n.createElement("header",{className:g},n.createElement("h2",{className:"border-0 border-b-4 border-solid border-success"},"My projects")),n.createElement("main",{ref:a,hidden:!0},n.createElement("div",{className:"py-6 md:py-12"},n.createElement("div",{className:"my-0 mx-auto max-w-7xl"},!v&&n.createElement("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 px-4 md:px-0"},E.map((function(e){return n.createElement("div",{id:e.title,key:e.title+"-card",className:"bg-secondary-800 hover:bg-secondary-900 transition rounded-lg overflow-hidden"},n.createElement(i.Z,{to:(0,o.Z)(e.slug),className:"block h-full text-white hover:text-white no-underline hover:no-underline"},e.imageUrl?n.createElement("div",{className:"overflow-hidden h-40 md:h-48"},n.createElement("img",{src:(0,o.Z)(e.imageUrl),alt:e.title})):n.createElement("div",{className:"alternate"==e.bgColor?"overflow-hidden bg-danger h-40 md:h-48":"overflow-hidden bg-success h-40 md:h-48"},n.createElement("h2",{className:"m-3 inline-block"},e.title)),n.createElement("div",{className:"pt-4 px-4"},n.createElement("h3",{className:"mb-1"},e.title),n.createElement("p",{className:"text-s mb-2 text-secondary-500"},e.period),n.createElement("p",null,e.subtitle),n.createElement("p",{className:"text-primary-default font-bold"},"Read more"))))}))),n.createElement("div",{className:(0,l.Z)("text--center margin-bottom--xl",p),style:{display:v?"block":"none"}},n.createElement(i.Z,{to:(0,o.Z)("/projects")},n.createElement("button",{className:"border-0 rounded py-2 px-4 mb-2 bg-primary-900 hover:bg-primary-800 transition text-white text-lg cursor-pointer"},"Back")),n.createElement("h1",null,N.title),n.createElement("h2",null,N.subtitle),N.imageUrl&&n.createElement("img",{src:(0,o.Z)(N.imageUrl),alt:N.title}),n.createElement("div",null,n.createElement("ul",null,n.createElement("li",null,n.createElement(b,{category:N.category})," ",N.category),n.createElement("li",null,n.createElement(m.G,{alt:"Calendar",icon:d.fT7})," ",N.period),n.createElement("li",null,n.createElement(m.G,{alt:"Code",icon:d.dT$})," ",N.tech),N.team&&n.createElement("li",null,n.createElement(m.G,{alt:"Team",icon:d.FVb})," ",N.team.map((function(e,t){return n.createElement("span",{key:t},e.link&&n.createElement("a",{href:e.link},e.name),!e.link&&e.name,t<N.team.length-1?", ":"")})))),n.createElement("b",null,"Description"),n.createElement("div",null,N.description),N.links&&n.createElement(n.Fragment,null,n.createElement("b",null,"Links"),n.createElement("ul",null,N.links.map((function(e,t){return n.createElement("li",{key:t},n.createElement("a",{href:e.link},n.createElement(m.G,{alt:"Link",icon:d.nNP})," ",e.name))}))))),n.createElement(i.Z,{to:(0,o.Z)("/projects")},n.createElement("button",{className:"border-0 rounded py-2 px-4 bg-primary-900 hover:bg-primary-800 transition text-white text-lg cursor-pointer"},"More projects"))))),n.createElement("section",{className:h},n.createElement("div",{className:"container"},n.createElement("h3",null,"Continue exploring?"),n.createElement("nav",{className:"pagination-nav"},n.createElement("div",null,n.createElement(i.Z,{className:"pagination-nav__link",to:(0,o.Z)("blog/")},n.createElement("div",{className:"pagination-nav__sublabel"},"Read"),n.createElement("div",{className:"pagination-nav__label"},"My blog"))),n.createElement("div",null,n.createElement("a",{className:"pagination-nav__link",href:(0,o.Z)("pdf/resume.pdf")},n.createElement("div",{className:"pagination-nav__sublabel"},"Download"),n.createElement("div",{className:"pagination-nav__label"},"My resume"))))))))}}}]);