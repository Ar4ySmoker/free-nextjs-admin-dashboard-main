import type { Manager } from "@prisma/client";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

export async function fetchManagers(): Promise<Manager[]> {
  return await prisma.manager.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchManagerById(id: number): Promise<Manager | null> {
  const manager = await prisma.manager.findFirst({
    where: {
      id,
    },
  });

  if (!manager) {
    notFound(); 
  }

  return manager;
}
