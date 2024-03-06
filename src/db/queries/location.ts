import type { Location } from "@prisma/client";
import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";

export async function fetchLocation(): Promise<Location[]> {
  return await prisma.location.findMany({});
}
