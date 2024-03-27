"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ProfessionSchema = z.object({

  name: z.string(),
  // description: z.string(),
 
});

export const saveProfession = async (prevSate: any, formData: FormData) => {
  const validatedFields = ProfessionSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.profession.create({
      data: {
     
        name: validatedFields.data.name,
        // description: validatedFields.data.description,
       
      },
    });
  } catch (error) {
    return { message: "Failed to create new Candidate" };
  }
  revalidatePath("/tables");
  redirect("/tables");
};

export const getProfessionlist = async (query: string) => {
  try {
    const professions = await prisma.profession.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return professions;
  } catch (error) {
    throw new Error("Failed to fetch Location data");
  }
};
