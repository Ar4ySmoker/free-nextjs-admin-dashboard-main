// src/db/queries/posts.ts

import type { Location } from "@prisma/client";
import { prisma } from "@/db";
import { notFound } from "next/navigation";
import { z } from "zod";
const LocationSchema = z.object({
  name: z.string().min(2),
});

export async function fetchLocation(): Promise<Location[]> {
  return await prisma.location.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchLocationtById(id: string): Promise<Location | null> {
  const location = await prisma.location.findFirst({
    where: {
      id,
    },
  });

  if (!location) {
    notFound();
  }

  return location;
}

export const updateLocation = async (
  id: string,
  prevSate: any,
  formData: FormData,
) => {
  const validatedFields = LocationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.location.update({
      data: {
        name: validatedFields.data.name,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update employee" };
  }
};
