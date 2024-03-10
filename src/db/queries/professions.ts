"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ProfessionSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  description: z.string(),
  needCandidate: z.number(),
  countPartners: z.number(),
  candidate: z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
  }),
  partners: z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    nameCompany: z.string(),
  }),
  vacanciess: z.string(),
});

export const saveCandidate = async (prevSate: any, formData: FormData) => {
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
        id: validatedFields.data.id,
        name: validatedFields.data.name,
        needCandidate: validatedFields.data.needCandidate,
        countPartners: validatedFields.data.countPartners,
        description: validatedFields.data.description,
        candidate: {
          create: {
            id: "",
            name: "",
            phone: "",
            email: "",
            managerId: "",
            location: {
              create: {
                id: "",
              },
            },
            createdAt: "",
            updatedAt: "",
          },
        },

        partners: {
          create: {
            id: 1,
            name: "",
            phone: "",
            nameCompany: "",
            email: "",
          },
        },
      },
    });
  } catch (error) {
    return { message: "Failed to create new Candidate" };
  }
};

export const getProfessionlist = async (query: string) => {
  try {
    const professions = await prisma.profession.findMany({
      select: {
        id: true,
        name: true,
        countPartners: true,
        description: true,
        candidate: true,
        partners: true,
      },
    });
    return professions;
  } catch (error) {
    throw new Error("Failed to fetch Candidates data");
  }
};

// export const getCandidateById = async (id: string) => {
//   try {
//     const candidate = await prisma.candidate.findUnique({
//       where: { id },
//     });
//     return candidate;
//   } catch (error) {
//     throw new Error("Failed to fetch contact data");
//   }
// };

// export const updateCandidate = async (
//   id: string,
//   prevSate: any,
//   formData: FormData,
// ) => {
//   const validatedFields = ProfessionSchema.safeParse(
//     Object.fromEntries(formData.entries()),
//   );

//   if (!validatedFields.success) {
//     return {
//       Error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   try {
//     await prisma.candidate.update({
//       data: {
//         name: validatedFields.data.name,
//         email: validatedFields.data.email,
//         phone: validatedFields.data.phone,
//       },
//       where: { id },
//     });
//   } catch (error) {
//     return { message: "Failed to update candidate" };
//   }

//   revalidatePath("/tables");
//   redirect("/tables");
// };

// export const deleteCandidate = async (id: string) => {
//   try {
//     await prisma.candidate.delete({
//       where: { id },
//     });
//   } catch (error) {
//     return { message: "Failed to delete candidate" };
//   }

//   revalidatePath("/tables");
// };
