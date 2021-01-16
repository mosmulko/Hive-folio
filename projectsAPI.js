const projects = [
  {
    title: "War and Peace",
    year: "2017",
    synapsis: "that is the short synapsis",
    description: "That is going to be a really long text among photos",
  },
  {
    title: "Les Misérables",
    year: "2017",
    synapsis: "that is the short synapsis",
    description: "That is going to be a really long text among photos",
  },
  {
    title: "The Time Machine",
    year: "2017",
    synapsis: "that is the short synapsis",
    description: "That is going to be a really long text among photos",
  },
  {
    title: "A Journey into the Center of the Earth",
    year: "2017",
    synapsis: "that is the short synapsis",
    description: "That is going to be a really long text among photos",
  },
  {
    title: "The Dark World",
    year: "2017",
    synapsis: "that is the short synapsis",
    description: `We're an experienced team of designers & developers, partnering with brands like Google, Nike, and National Geographic since 2011. We care deeply about what we do and have become experts in beautifully-designed software.
    <br><br>We are here to build a high-quality extension for brands to serve their consumers. We're not interested in fluff - we want to build useful tools that will keep people coming back`,
  },
];

projects.forEach((project) => {
  project.route = project.title.split(" ").join("");
});

module.exports = projects;
