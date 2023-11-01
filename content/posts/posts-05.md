---
title: Update Personal Website to NextJS 14
description: My impression about the new NextJs 14, RSC and App router
author: "Ricardo de Arruda"
date: 2023-11-01
draft: false 
tags: [frontend, nextjs, development, RSC]
---

After the watching the [nextjs 14](https://nextjs.org/blog/next-14) release blog post I got excited about the new RSC pattern and felt like a good time to update my personal website from nextjs 13 to 14.

This website uses markdown files for the blog post, like this one, and for my CV. It was simple to update from page router SSG (getStaticProps) to React Server Component, and seems like a better abstraction for the legacy concept of getStaticProps.
Vercel provide a [migration guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#static-site-generation-getstaticprops) that I followed for this update taking about 2 hours to complete.

I use puppetter to generate a PDF version of my CV and stream using <Suspense /> when PDF generated, however I still need to figure out how to run the PDF generation on build time instead of runtime. So after deployed there's no CV pdf file on static folder, the first user that access the /about will be penalized by the first time load performance in order to generate the PDF.

The only problem right now is that I use Puppeteer to generate a PDF version of my CV and stream it using <Suspense /> once the PDF is generated. HoweverThe first user who accesses the /about page will experience a penalty in terms of initial load performance while the PDF is being generated.
With getStaticProps I could generate the PDF on build time. So, I still need to figure the best practice for this use case when using RSC.
