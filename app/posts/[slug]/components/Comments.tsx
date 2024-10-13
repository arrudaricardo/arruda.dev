"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <Giscus
      repo="arrudaricardo/arruda.dev"
      repoId="MDEwOlJlcG9zaXRvcnkyNTkxNDQzNzQ="
      categoryId="DIC_kwDOD3I6ts4CjV-F"
      category="posts comments"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}
