import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '../src/generated/prisma/client';
import { SeedData, seedData } from './seed/data';
const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL is required to seed the database');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(url),
});

function toDate(value: string): Date {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Некорретная дата "${value}"`);
  }
  return date;
}
function validateSeedData(data: SeedData): void {
  const skills = new Set<string>();
  for (const name of data.skills) {
    if (skills.has(name)) {
      throw new Error(`Навык "${name}" указан дважды`);
    }
    skills.add(name);
  }
  for (const project of data.projects) {
    for (const name of project.skills) {
      if (!skills.has(name)) {
        throw new Error(
          `Проект "${project.name}": неизвестный навык "${name}"`,
        );
      }
    }
  }
  for (const experience of data.experiences) {
    const start = toDate(experience.startDate);
    if (experience.endDate && toDate(experience.endDate) < start) {
      throw new Error(`Опыт "${experience.company}": endDate раньше startDate`);
    }
  }
}

function createProfile(tx: Prisma.TransactionClient, data: SeedData) {
  return tx.profile.create({
    data: {
      ...data.profile,
      links: {
        create: data.links.map((link, index) => ({
          ...link,
          sortOrder: index,
        })),
      },
      skills: {
        create: data.skills.map((name, index) => ({
          name,
          sortOrder: index,
        })),
      },
      experiences: {
        create: data.experiences.map(
          ({ startDate, endDate, achievements, ...experience }) => ({
            ...experience,
            startDate: toDate(startDate),
            endDate: endDate ? toDate(endDate) : null,
            achievements: {
              create: achievements.map((text, index) => ({
                text: text,
                sortOrder: index,
              })),
            },
          }),
        ),
      },
    },
  });
}
async function createProjects(
  tx: Prisma.TransactionClient,
  profileId: string,
  projects: SeedData['projects'],
): Promise<void> {
  for (const [index, { skills, ...project }] of projects.entries()) {
    await tx.project.create({
      data: {
        ...project,
        sortOrder: index,
        profile: { connect: { id: profileId } },
        projectSkills: {
          create: skills.map((name) => ({
            skill: { connect: { profileId_name: { profileId, name } } },
          })),
        },
      },
    });
  }
}

async function seed(): Promise<void> {
  validateSeedData(seedData);

  const profile = await prisma.$transaction(
    async (tx) => {
      await tx.profile.deleteMany();
      const profile = await createProfile(tx, seedData);
      await createProjects(tx, profile.id, seedData.projects);
      return profile;
    },
    { timeout: 15_000 },
  );
  console.log(`
    Профиль "${profile.name}"
    `);
}
seed()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
