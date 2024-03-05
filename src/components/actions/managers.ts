
"use server";

import { prisma } from "@/db";
import type { Manager } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { string, z } from "zod";
// const postSchema = z.object({
//   title: z.string().min(3).max(255),
//   content: z.string().min(10).max(4000),
// });

const managerSchema = z.object({
  email: z.string().min(3).max(255),
  name: z.string().min(3).max(4000),
  // posts: z.array(postSchema),
});

interface ManagerFormState {
  errors: {
    email?: string[];
    name?: string[];
    _form?: string[];
  };
}

export async function createManager(
  formState: ManagerFormState,
  formData: FormData
): Promise<ManagerFormState> {

  const result = managerSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!result.success) {
    return {

      errors: result.error.flatten().fieldErrors,
    };
  }

  let manager: Manager;
  try {
    manager = await prisma.manager.create({
      data: {
        email: result.data.email,
        name: result.data.name,
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

export async function updateManager(
  id: number,
  formState: ManagerFormState,
  formData: FormData
): Promise<ManagerFormState> {
  const result = managerSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let manager: Manager;
  try {
    manager = await prisma.manager.update({
      where: { id },
      data: {
        email: result.data.email,
        name: result.data.name,
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

export async function deleteManager(id: number): Promise<ManagerFormState> {
  let manager: Manager;
  try {
    manager = await prisma.manager.delete({
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
