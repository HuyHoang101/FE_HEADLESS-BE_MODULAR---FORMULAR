export const formatJob = (j) => ({
    id: j.id,
    title: j.title,
    companyId: j.companyId,
    company: { name: j.companyName, logo: j.companyLogo },
    skills: j.tags || [],
    perks: j.benefits || [],
    salaryMin: j.salaryMin,
    salaryMax: j.salaryMax,
    location: j.location,
    type: j.employmentType,
    description: j.description,
    createdAt: j.createdAt,
    updatedAt: j.updatedAt
});