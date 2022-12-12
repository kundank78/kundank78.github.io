import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const projects = [
  {
    category: "Project",
    title: "image-colorization-using-gans",
    slug: "#image-colorization-using-gans",
    imageUrl: "img/projects/Colorization_gan.png",
    subtitle:
      "Gray-scale Image Colorization using Conditional Generative Adversarial Network.",
    period: "May 2018",
    tech: "PyTorch, Adversarial Network",
    description: (
      <>
        <p>
          Gray-scale Image Colorization using Conditional Generative Adversarial Network.
          This is a PyTorch implementation of the DCGAN as described in the paper
          Image Colorization using Generative Adversarial Networks
        </p>
        <h4>Method</h4>
        <p>
            In a traditional GAN, the input of the generator is randomly generated noise data z.
            However, this approach is not applicable to the automatic colorization problem due to the nature of its inputs.
            The generator must be modified to accept grayscale images as inputs rather than noise.
            This problem was addressed by using a variant of GAN called conditional generative adversarial networks.
            Since no noise is introduced, the input of the generator is treated as zero noise with the grayscale input as a prior:
            <br/>
            <br/>
            <img src="https://github.com/kundank78/Colorization_GAN/raw/master/img/con_gan.png"/>
            <br/>
            <br/>
        </p>
        <h4> Network Architecture </h4>
        <p>
            The architecture of generator is inspired by U-Net:
            <br/>
            <br/>
            <img src="https://github.com/kundank78/Colorization_GAN/raw/master/img/unet.png"/>
            <br/>
            <br/>
            The architecture of the model is symmetric, with n encoding units and n decoding units.
            For discriminator, we use similar architecture as the baselines contractile path.
        </p>
        <h4> Datasets </h4>
        <p>
            We used CIFAR-10 dataset to train model. Download dataset <a href="https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz">here</a>.
        </p>
      </>
    ),
    links: [
      {
        name: "GitHub repository",
        link: "https://github.com/kundank78/Colorization_GAN",
      },
      {
        name: "Image Colorization using GANs Paper",
        link: "https://arxiv.org/pdf/1803.05400.pdf",
      },
      {
        name: "A TensorFlow Implementation of Image Colorization",
        link: "https://github.com/ImagingLab/Colorizing-with-GANs",
      },
    ],
  }
];

export default projects;
