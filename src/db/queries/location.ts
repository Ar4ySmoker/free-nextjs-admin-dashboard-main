"use server";

import { z } from "zod"; //npm i zod https://www.npmjs.com/package/zod
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const LocationShema = z.object({

  name: z.string(),
});

export const saveLocation = async (prevState: any, formData: FormData) => {
  const validatedFields = LocationShema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.location.create({
      data: {
        
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return { message: "Failed to create Location" };
  }
  revalidatePath("/tables");
  redirect("/tables");
};

export const getLocationlist = async (query: string) => {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return locations;
  } catch (error) {
    throw new Error("Failed to fetch Location data");
  }
};

export const getLocationById = async (id: string) => {
  try {
    const locations = await prisma.location.findUnique({
      where: { id },
    });
    return location;
  } catch (error) {
    throw new Error("Failed to fetch location data");
  }
};

export const updateLocation = async (
  id: string,
  prevSate: any,
  formData: FormData,
) => {
  const validatedFields = LocationShema.safeParse(
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
    return { message: "Failed to update location" };
  }
};

export const deleteLocation = async (id: string) => {
  try {
    await prisma.location.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete location" };
  }
  revalidatePath("/tables");
  redirect("/tables");
};
