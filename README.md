# Hive-folio
Portfolio website for the small engeneering design studio based in London. I'm also responsible for the UX/UI design.

I wanted to make it as a SSR website, so the administrator of the website could simply add, delete or edit projects by himself without asking a developer to do that for him every
single time. Gallery will then get dynamically rendered through React based on the data from the database. I chose React instead of just sticking with the html template, because depending on the number of projects the gallery's layout changes completely and I need classes to be applied to the elements accordingly. Also React is SSR rendered to improve SEO and the initial render time.

So far I've finished landing page, gallery's page layout is styled and next I need to change it into React components.

Used technologies so far:

- html, react, css (BEM)

- express, ejs

- webpack

You can check the current progress here: 

https://pacific-escarpment-96024.herokuapp.com
