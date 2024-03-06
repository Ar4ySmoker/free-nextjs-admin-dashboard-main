"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CandidateSchema = z.object({
  name: z.string().min(6),
  email: z.string().min(6),
  phone: z.string().min(11),
});

export const saveCandidate = async (prevSate: any, formData: FormData) => {
  const validatedFields = CandidateSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.candidate.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
      },
    });
  } catch (error) {
    return { message: "Failed to create new Candidate" };
  }

  revalidatePath("/candidate");
  redirect("/candidate");
};

export const getCandidatelist = async (query: string) => {
  try {
    const candidates = await prisma.candidate.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return candidates;
  } catch (error) {
    throw new Error("Failed to fetch Candidates data");
  }
};

export const getCandidateById = async (id: string) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id },
    });
    return candidate;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};

export const updateCandidate = async (
  id: string,
  prevSate: any,
  formData: FormData,
) => {
  const validatedFields = CandidateSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.candidate.update({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update candidate" };
  }

  revalidatePath("/candidate");
  redirect("/candidate");
};

export const deleteCandidate = async (id: string) => {
  try {
    await prisma.candidate.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete candidate" };
  }

  revalidatePath("/candidate");
};
