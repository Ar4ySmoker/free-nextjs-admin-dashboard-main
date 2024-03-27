"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const CandidateSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  dateBirt: z.string(),
  phone: z.string(),
  email: z.string(),
  profession: z.string(),
  documents: z.string(),
  location: z.string().min(1),
  comment: z.string()
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
        lastName: validatedFields.data.lastName,
        dateBirt: validatedFields.data.dateBirt,
        phone: validatedFields.data.phone,
        email: validatedFields.data.email,
        profession:{
        create:{
           name:"Плиточник"
        }
        },
        documents:{
          create:{
            name:"Пасспорт"
          }
        },
        location: {
          create: {
            name: "Город",
          },
        },
        comment: validatedFields.data.comment,   
      },
    });
    console.log("working")
  } catch (error) {
    return { message: "Failed to create new Candidate" };
  }
  console.log("working")
  revalidatePath("/tables");
  redirect("/tables");
};

export const getCandidatelist = async (query: string) => {
  try {
    const candidates = await prisma.candidate.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        phone: true,
        location:true,
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

  revalidatePath("/tables");
  redirect("/tables");
};

export const deleteCandidate = async (id: string) => {
  try {
    await prisma.candidate.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete candidate" };
  }

  revalidatePath("/tables");
  redirect("/tables");
};
