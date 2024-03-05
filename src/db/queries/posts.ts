// src/db/queries/posts.ts

import type { Post } from "@prisma/client";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

export async function fetchPosts(): Promise<Post[]> {
  return await prisma.post.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchPostById(id: number): Promise<Post | null> {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
