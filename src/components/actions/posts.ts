"use server";

import { prisma } from "@/db";
import type { Post } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10).max(4000),
  author: z.string({
    invalid_type_error: "Please select a author.",
  }),
});

interface PostFormState {
  errors: {
    title?: string[];
    content?: string[];
    author?: string[];
    _form?: string[];
  };
}

export async function createPost(
  formState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const result = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let post: Post;
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        // author: result.data.author,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}

export async function updatePost(
  id: number,
  formState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const result = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let post: Post;
  try {
    post = await prisma.post.update({
      where: { id },
      data: {
        title: result.data.title,
        content: result.data.content,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}

export async function deletePost(id: number): Promise<PostFormState> {
  let post: Post;
  try {
    post = await prisma.post.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}
