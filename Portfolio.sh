#!/bin/bash

# Navigate to your repo folder first
# Example: cd ~/path/to/Walexrius.github.io

echo "Creating Jekyll portfolio structure..."

# Create files and folders
mkdir -p assets

# _config.yml
cat <<EOL > _config.yml
title: "Kamal Singh"
description: "Medical Student & Biomedical Engineer | Portfolio"
baseurl: ""
url: "https://Walexrius.github.io"
theme: minima

nav_links:
  - title: "Home"
    url: "/"
  - title: "About"
    url: "/about"
  - title: "Projects"
    url: "/projects"
  - title: "Contact"
    url: "/contact"

github_username: Walexrius
linkedin: "https://www.linkedin.com/in/kamalsingh"
email: "kamal@example.com"
EOL

# index.md
cat <<EOL > index.md
---
layout: home
title: "Home"
---

# Welcome to My Portfolio

Hi, I’m **Kamal Singh**, a Medical Student & Biomedical Engineer passionate about biomedical research, technology, and healthcare innovation.

## Quick Links

- [About Me](/about)  
- [Projects](/projects)  
- [Contact](/contact)
EOL

# about.md
cat <<EOL > about.md
---
layout: page
title: "About"
permalink: /about
---

# About Me

I am currently a **3rd-year medical student and biomedical engineering student**. I’m interested in:

- Biomedical research  
- Neuroanatomy and immunology  
- Wearable medical technology  

I aim to combine medicine and engineering to develop innovative healthcare solutions.
EOL

# projects.md
cat <<EOL > projects.md
---
layout: page
title: "Projects"
permalink: /projects
---

# Projects

## PPG Blood Pressure Estimation
Using multi-wavelength PPG signals for accurate blood pressure prediction.

## Neuroanatomy Study Tools
Exam-oriented resources for CNS anatomy students.

## Immunology Research Summaries
Detailed notes and summaries on tumor immunology, autoimmune disorders, and more.
EOL

# contact.md
cat <<EOL > contact.md
---
layout: page
title: "Contact"
permalink: /contact
---

# Contact Me

- **Email:** [kamal@example.com](mailto:kamal@example.com)  
- **GitHub:** [Walexrius](https://github.com/Walexrius)  
- **LinkedIn:** [kamalsingh](https://www.linkedin.com/in/kamalsingh)
EOL

# Gemfile
cat <<EOL > Gemfile
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
EOL

# Optional CSS
cat <<EOL > assets/style.css
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

h1, h2, h3 {
    color: #333;
}

a {
    color: #007acc;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
EOL

echo "Portfolio structure created successfully!"